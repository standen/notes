import { useMemo, useCallback, useState, useEffect } from "react";

import type {
  IRole,
  IRolesNamesListRequest,
  IRolesNamesListResponse,
  IRolesListRequest,
  IRolesListResponse,
  IPermissionsList,
  IPermissionsListRequest,
  IPermissionsListResponse,
  IRoleParamsRequest,
  IRoleParamsResponse,
  IRoleDeleteRequest,
  IRoleEditRequest,
  IResponse,
  IRoleCreateRequest,
} from "@/api/generated_types";
import type { TFormRoleEdit } from "@/pages/PageSettings/components/AdminRoles/forms/FormRoleEdit";

import { storeUserInfo } from "@/store";
import { useRequest } from "@/hooks";
import { API } from "@/api";

import {
  FormRoleCreate,
  FormRoleEdit,
} from "@/pages/PageSettings/components/AdminRoles/forms";

import { App, Skeleton } from "antd";

export const useRoles = () => {
  const { modal } = App.useApp();
  const { makeRequest } = useRequest();
  const { user } = storeUserInfo();

  const [roles, setRoles] = useState<IRole[]>([]);

  const getPermissions = useCallback(async (): Promise<IPermissionsList> => {
    const perms = await makeRequest<
      IPermissionsListRequest,
      IPermissionsListResponse
    >(
      {
        params: {
          method: "get",
          url: API.settings.permissions,
          params: { action: "get_permissions_list" },
        },
      },
      true,
    );

    return perms?.result?.permissions ?? [];
  }, [makeRequest]);

  const getRoleParams = useCallback(
    async (roleId: string): Promise<IRole | undefined> => {
      const roleParams = await makeRequest<
        IRoleParamsRequest,
        IRoleParamsResponse
      >(
        {
          params: {
            method: "get",
            url: API.settings.roles,
            params: {
              action: "get_role_params",
              role_id: roleId,
            },
          },
        },
        true,
      );

      return roleParams?.result?.role_params;
    },
    [makeRequest],
  );

  const getRolesNames = useCallback(async (): Promise<string[]> => {
    const rolesNames = await makeRequest<
      IRolesNamesListRequest,
      IRolesNamesListResponse
    >(
      {
        params: {
          method: "get",
          url: API.settings.roles,
          params: { action: "get_roles_names_list" },
        },
      },
      true,
    );

    return rolesNames?.result?.roles_names ?? [];
  }, [makeRequest]);

  const getRoles = useCallback(async () => {
    const roles = await makeRequest<IRolesListRequest, IRolesListResponse>({
      params: {
        method: "get",
        url: API.settings.roles,
        params: { action: "get_roles_list" },
      },
    });

    setRoles(roles?.result?.roles ?? []);
    return roles?.result?.roles ?? [];
  }, [makeRequest]);

  const createRole = useCallback(async () => {
    const modalRole = modal.confirm({
      title: "Создание роли",
      footer: null,
      icon: null,
      closable: true,
      width: 600,
      content: <Skeleton active />,
    });

    const perms = await getPermissions();
    const rolesNames = await getRolesNames();

    if (perms?.length === 0) {
      return;
    }

    const roleData = await new Promise<IRoleCreateRequest>((resolve) =>
      modalRole.update({
        content: (
          <FormRoleCreate
            permissions={perms}
            rolesNames={rolesNames}
            resolve={resolve}
          />
        ),
      }),
    );

    if (!roleData) {
      return;
    }

    await makeRequest<IRoleCreateRequest, IResponse>(
      {
        params: {
          method: "post",
          url: API.settings.roles,
          data: {
            name: roleData?.name,
            allowed_actions: roleData?.allowed_actions,
          },
        },
      },
      true,
    );

    getRoles();

    modalRole.destroy();
  }, [
    getPermissions,
    getRolesNames,
    getRoleParams,
    modal,
    makeRequest,
    getRoles,
  ]);

  const editRole = useCallback(
    async (roleId: string) => {
      const modalRole = modal.confirm({
        title: "Редактирование роли",
        footer: null,
        icon: null,
        closable: true,
        width: 600,
        content: <Skeleton active />,
      });

      const perms = await getPermissions();
      const rolesNames = await getRolesNames();

      if (perms?.length === 0) {
        return;
      }

      let roleParams: IRole | undefined;

      roleParams = await getRoleParams(roleId);

      if (!roleParams) {
        return;
      }

      const roleData = await new Promise<TFormRoleEdit>((resolve) =>
        modalRole.update({
          content: (
            <FormRoleEdit
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

      await makeRequest<IRoleEditRequest, IResponse>(
        {
          params: {
            method: "patch",
            url: API.settings.roles,
            data: {
              role_id: roleId,
              name: roleData?.name,
              allowed_actions: roleData?.allowed_actions,
            },
          },
        },
        true,
      );

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
      await makeRequest<IRoleDeleteRequest, IResponse>({
        params: {
          method: "delete",
          url: API.settings.roles,
          data: {
            role_id: roleId,
          },
        },
      });

      getRoles();
    },
    [makeRequest, getRoles],
  );

  useEffect(() => {
    getRoles();
  }, [getRoles, user]);

  return useMemo(
    () => ({ delRole, editRole, roles, getRoles, createRole }),
    [delRole, editRole, roles, getRoles, createRole],
  );
};
