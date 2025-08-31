import { useCallback, useEffect, useMemo, useState } from "react";

import type {
  IUser,
  IResponseUserParams,
  IResponseUsersList,
  IResponseUsersLogins,
  IResponseRolesList,
  IRole,
} from "@/api/settings";
import type { TFormEditUser } from "@/pages/PageSettings/components/AdminUsers/forms/FormEditUser";

import { useRequest } from "@/hooks";
import { API } from "@/api";

import { FormEditUser } from "@/pages/PageSettings/components/AdminUsers/forms/FormEditUser";

import { App } from "antd";
import { sha256 } from "@/utils";

export const useUsers = () => {
  const { modal } = App.useApp();
  const { makeRequest } = useRequest();

  const [users, setUsers] = useState<IUser[]>([]);

  const getRoles = useCallback(async (): Promise<IRole[]> => {
    const roles = await makeRequest<IResponseRolesList>({
      params: { method: "get", url: API.settings.roles },
      customError: "Ошибка при получении списка ролей",
    });

    return roles?.result?.roles ?? [];
  }, [makeRequest]);

  const getUsersLogins = useCallback(async (): Promise<string[]> => {
    const usersLogins = await makeRequest<IResponseUsersLogins>({
      params: { method: "get", url: API.settings.allUsersLogins },
      customError: "Ошибка при получении списка ранее созданных ролей",
    });

    return usersLogins?.result?.usersLogins ?? [];
  }, [makeRequest]);

  const getUsers = useCallback(async (): Promise<IUser[]> => {
    const users = await makeRequest<IResponseUsersList>({
      params: {
        method: "get",
        url: API.settings.users,
      },
      customError: "Ошибка при получении списка пользователей",
    });

    setUsers(users?.result?.users ?? []);
    return users?.result?.users ?? [];
  }, [makeRequest]);

  const getUserParams = useCallback(
    async (userId: string): Promise<IUser | undefined> => {
      const userParams = await makeRequest<IResponseUserParams>({
        params: {
          method: "post",
          url: API.settings.users,
          data: {
            action: "userGet",
            userId,
          },
        },
        customError: "Ошибка при получении информации о пользователе",
      });

      return userParams?.result?.userParams;
    },
    [makeRequest]
  );

  const editUser = useCallback(
    async (userId?: string) => {
      const roles = await getRoles();
      const userLogins = await getUsersLogins();

      if (roles?.length === 0) {
        return;
      }

      let userParams: IUser | undefined;

      if (userId) {
        userParams = await getUserParams(userId);

        if (!userParams) {
          return;
        }
      }

      const modalUser = modal.confirm({
        title: userId ? "Редактирование пользователя" : "Создание пользователя",
        footer: null,
        icon: null,
        closable: true,
        width: 600,
        content: null,
      });

      const userData = await new Promise<TFormEditUser>((resolve) =>
        modalUser.update({
          content: (
            <FormEditUser
              roles={roles}
              userParams={userParams}
              userLogins={userLogins?.filter(
                (item) => item !== userParams?.login
              )}
              resolve={resolve}
            />
          ),
        })
      );

      if (!userData) {
        return;
      }

      let pass = null;
      if (userData?.password) {
        pass = await sha256(userData?.password);
      }

      await makeRequest({
        params: {
          method: userId ? "patch" : "post",
          url: API.settings.users,
          data: userId
            ? {
                userId,
                login: userData?.login,
                password: pass,
                roleId: userData?.roleId,
              }
            : {
                action: "userCreate",
                login: userData?.login,
                password: pass,
                roleId: userData?.roleId,
              },
        },
        customError: "Ошибка при обработке роли",
      });

      getUsers();

      modalUser.destroy();
    },
    [getRoles, getUsersLogins, getUserParams, modal, getUsers, makeRequest]
  );

  const delUser = useCallback(
    async (userId: string) => {
      await makeRequest({
        params: {
          method: "delete",
          url: API.settings.users,
          data: {
            userId,
          },
        },
        customError: "Во время удаления пользователя произошла ошибка",
      });

      getUsers();
    },
    [makeRequest, getUsers]
  );

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return useMemo(
    () => ({ editUser, delUser, users }),
    [editUser, delUser, users]
  );
};
