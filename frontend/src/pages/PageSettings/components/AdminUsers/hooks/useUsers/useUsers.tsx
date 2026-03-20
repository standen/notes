import { useCallback, useEffect, useMemo, useState } from "react";
import { sha256 } from "js-sha256";

import type {
  IUser,
  IRole,
  IUserParamsResponse,
  IUsersListResponse,
  IUsersLoginsListResponse,
  IRolesListResponse,
} from "@/api/generated_types";
import type { TFormEditUser } from "@/pages/PageSettings/components/AdminUsers/forms/FormEditUser";

import { useRequest } from "@/hooks";
import { API } from "@/api";

import { FormEditUser } from "@/pages/PageSettings/components/AdminUsers/forms/FormEditUser";

import { App } from "antd";

export const useUsers = () => {
  const { modal } = App.useApp();
  const { makeRequest } = useRequest();

  const [users, setUsers] = useState<IUser[]>([]);

  const getRoles = useCallback(async (): Promise<IRole[]> => {
    const roles = await makeRequest<IRolesListResponse>({
      params: { method: "get", url: API.settings.roles },
    });

    return roles?.result?.roles ?? [];
  }, [makeRequest]);

  const getUsersLogins = useCallback(async (): Promise<string[]> => {
    const usersLogins = await makeRequest<IUsersLoginsListResponse>({
      params: { method: "get", url: API.settings.allUsersLogins },
    });

    return usersLogins?.result?.users_logins ?? [];
  }, [makeRequest]);

  const getUsers = useCallback(async (): Promise<IUser[]> => {
    const users = await makeRequest<IUsersListResponse>({
      params: {
        method: "get",
        url: API.settings.users,
      },
    });

    setUsers(users?.result?.users ?? []);
    return users?.result?.users ?? [];
  }, [makeRequest]);

  const getUserParams = useCallback(
    async (userId: string): Promise<IUser | undefined> => {
      const userParams = await makeRequest<IUserParamsResponse>({
        params: {
          method: "post",
          url: API.settings.users,
          data: {
            action: "userGet",
            userId,
          },
        },
      });

      return userParams?.result?.user_params;
    },
    [makeRequest],
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
                (item) => item !== userParams?.login,
              )}
              resolve={resolve}
            />
          ),
        }),
      );

      if (!userData) {
        return;
      }

      let pass = null;
      if (userData?.password) {
        pass = sha256(userData?.password);
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
      });

      getUsers();

      modalUser.destroy();
    },
    [getRoles, getUsersLogins, getUserParams, modal, getUsers, makeRequest],
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
      });

      getUsers();
    },
    [makeRequest, getUsers],
  );

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return useMemo(
    () => ({ editUser, delUser, users }),
    [editUser, delUser, users],
  );
};
