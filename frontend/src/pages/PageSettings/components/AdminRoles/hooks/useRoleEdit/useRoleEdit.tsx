import { useMemo, useCallback } from "react";

import {
  type IRole,
  type IResponsePermissionsList,
  type IResponseRolesNames,
  type IResponseUsersLogins,
  type IResponseRoleParams,
} from "@/api/settings";
import { type TFormEditRole } from "@/pages/PageSettings/components/AdminRoles/forms/FormEditRole";

import { useRequest } from "@/hooks";
import { API } from "@/api";

import { FormEditRole } from "@/pages/PageSettings/components/AdminRoles/forms/FormEditRole";

import { App } from "antd";

export const useRoleEdit = () => {
  const { modal } = App.useApp();
  const { makeRequest } = useRequest();

  const getPermissions = useCallback(async (): Promise<
    string[] | undefined
  > => {
    const perms = await makeRequest<IResponsePermissionsList>(
      { method: "get", url: API.settings.permissions },
      "Ошибка при получении списка allowedActions"
    );

    if (!perms) {
      return;
    }

    return perms?.result?.permissions;
  }, [makeRequest]);

  const getRoleParams = useCallback(
    async (roleId: string): Promise<IRole | undefined> => {
      if (!roleId) {
        return;
      }

      const roleParams = await makeRequest<IResponseRoleParams>({
        method: "post",
        url: API.settings.roles,
        data: {
          action: "roleGet",
          roleId,
        },
      });

      if (!roleParams) {
        return;
      }

      return roleParams?.result?.roleParams;
    },
    [makeRequest]
  );

  const getRolesNames = useCallback(async (): Promise<string[] | undefined> => {
    const rolesNames = await makeRequest<IResponseRolesNames>(
      { method: "get", url: API.settings.allUsersRolesNames },
      "Ошибка при получении списка ранее созданных ролей"
    );

    if (!rolesNames) {
      return;
    }

    return rolesNames?.result?.rolesNames;
  }, [makeRequest]);

  const getUsersLogins = useCallback(async (): Promise<
    string[] | undefined
  > => {
    const usersLogins = await makeRequest<IResponseUsersLogins>(
      { method: "get", url: API.settings.allUsersRolesNames },
      "Ошибка при получении списка ранее созданных ролей"
    );

    if (!usersLogins) {
      return;
    }

    return usersLogins?.result?.usersLogins;
  }, [makeRequest]);

  const editRole = useCallback(
    async (roleId?: string) => {
      const perms = await getPermissions();
      const rolesNames = await getRolesNames();

      if (!perms || !rolesNames) {
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
              rolesNames={rolesNames}
              resolve={resolve}
            />
          ),
        })
      );

      if (!roleData) {
        return;
      }

      await makeRequest(
        {
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
        "Ошибка при обработке роли"
      );

      modalRole.destroy();
    },
    [getPermissions, getRolesNames, getRoleParams, modal, makeRequest]
  );

  return useMemo(() => ({ editRole }), [editRole]);
};
