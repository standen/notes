import { useMemo, useCallback, useState, useEffect } from "react";

import type {
  IRole,
  IRolesNamesListResponse,
  IRoleParamsResponse,
  IPermissionsListResponse,
  IRolesListResponse,
  IPermissionsList,
  IPermissionsListRequest,
} from "@/api/generated_types";
import { type TFormEditRole } from "@/pages/PageSettings/components/AdminRoles/forms/FormEditRole";

import { useRequest } from "@/hooks";
import { API } from "@/api";

import { FormEditRole } from "@/pages/PageSettings/components/AdminRoles/forms/FormEditRole";

import { App } from "antd";

export const useRoles = () => {
  const { modal } = App.useApp();
  const { makeRequest } = useRequest();

  const [roles, setRoles] = useState<IRole[]>([]);

  const getPermissions = useCallback(async (): Promise<IPermissionsList> => {
    const perms = await makeRequest<
      IPermissionsListResponse,
      IPermissionsListRequest
    >({
      params: {
        method: "get",
        url: API.settings.permissions,
        params: { action: "" },
      },
    });

    return perms?.result?.permissions ?? [];
  }, [makeRequest]);

  const getRoleParams = useCallback(
    async (roleId: string): Promise<IRole | undefined> => {
      const roleParams = await makeRequest<IRoleParamsResponse>({
        params: {
          method: "post",
          url: API.settings.roles,
          data: {
            action: "roleGet",
            roleId,
          },
        },
      });

      return roleParams?.result?.role_params;
    },
    [makeRequest],
  );

  const getRolesNames = useCallback(async (): Promise<string[]> => {
    const rolesNames = await makeRequest<IRolesNamesListResponse>({
      params: { method: "get", url: API.settings.allUsersRolesNames },
    });

    return rolesNames?.result?.roles_names ?? [];
  }, [makeRequest]);

  const getRoles = useCallback(async () => {
    const roles = await makeRequest<IRolesListResponse>({
      params: { method: "get", url: API.settings.roles },
    });

    setRoles(roles?.result?.roles ?? []);
    return roles?.result?.roles ?? [];
  }, [makeRequest]);

  const editRole = useCallback(
    async (roleId?: string) => {
      const perms = await getPermissions();
      const rolesNames = await getRolesNames();

      if (perms?.length === 0) {
        return;
      }

      let roleParams: IRole | undefined;

      if (roleId) {
        roleParams = await getRoleParams(roleId);

        if (!roleParams) {
          return;
        }
      }

      const modalRole = modal.confirm({
        title: roleId ? "Редактирование роли" : "Создание роли",
        footer: null,
        icon: null,
        closable: true,
        width: 600,
        content: null,
      });

      const roleData = await new Promise<TFormEditRole>((resolve) =>
        modalRole.update({
          content: (
            <FormEditRole
              permissions={perms}
              roleParams={roleParams}
              rolesNames={rolesNames.filter(
                (item) => item !== roleParams?.name,
              )}
              resolve={resolve}
            />
          ),
        }),
      );

      if (!roleData) {
        return;
      }

      await makeRequest({
        params: {
          method: roleId ? "patch" : "post",
          url: API.settings.roles,
          data: roleId
            ? {
                roleId,
                name: roleData?.name,
                allowed_actions: roleData?.allowed_actions,
              }
            : {
                action: "roleCreate",
                name: roleData?.name,
                allowed_actions: roleData?.allowed_actions,
              },
        },
      });

      getRoles();

      modalRole.destroy();
    },
    [
      getPermissions,
      getRolesNames,
      getRoleParams,
      modal,
      makeRequest,
      getRoles,
    ],
  );

  const delRole = useCallback(
    async (roleId: string) => {
      await makeRequest({
        params: {
          method: "delete",
          url: API.settings.roles,
          data: {
            roleId,
          },
        },
      });

      getRoles();
    },
    [makeRequest, getRoles],
  );

  useEffect(() => {
    getRoles();
  }, [getRoles]);

  return useMemo(
    () => ({ delRole, editRole, roles, getRoles }),
    [delRole, editRole, roles, getRoles],
  );
};
