import { useCallback, useEffect, useMemo, useState } from "react";
import { sha256 } from "js-sha256";

import type {
  IUser,
  IRole,
  IUserParamsRequest,
  IUserParamsResponse,
  IUsersListRequest,
  IUsersListResponse,
  IUsersLoginsListRequest,
  IUsersLoginsListResponse,
  IRolesListRequest,
  IRolesListResponse,
  IUserCreateRequest,
  IResponse,
  IUserEditRequest,
  IUserDeleteRequest,
} from "@/api/generated_types";
import type { TFormUserEdit } from "@/pages/PageSettings/components/AdminUsers/forms/FormUserEdit";

import { useRequest } from "@/hooks";
import { API } from "@/api";

import {
  FormUserEdit,
  FormUserCreate,
} from "@/pages/PageSettings/components/AdminUsers/forms";

import { App } from "antd";

export const useUsers = () => {
  const { modal } = App.useApp();
  const { makeRequest } = useRequest();

  const [users, setUsers] = useState<IUser[]>([]);

  const getRoles = useCallback(async (): Promise<IRole[]> => {
    const roles = await makeRequest<IRolesListRequest, IRolesListResponse>({
      params: {
        method: "get",
        url: API.settings.roles,
        params: { action: "get_roles_list" },
      },
    });

    return roles?.result?.roles ?? [];
  }, [makeRequest]);

  const getUsersLogins = useCallback(async (): Promise<string[]> => {
    const usersLogins = await makeRequest<
      IUsersLoginsListRequest,
      IUsersLoginsListResponse
    >({
      params: {
        method: "get",
        url: API.settings.users,
        params: {
          action: "get_users_logins_list",
        },
      },
    });

    return usersLogins?.result?.users_logins ?? [];
  }, [makeRequest]);

  const getUsers = useCallback(async (): Promise<IUser[]> => {
    const users = await makeRequest<IUsersListRequest, IUsersListResponse>({
      params: {
        method: "get",
        url: API.settings.users,
        params: {
          action: "get_users_list",
        },
      },
    });

    setUsers(users?.result?.users ?? []);
    return users?.result?.users ?? [];
  }, [makeRequest]);

  const getUserParams = useCallback(
    async (userId: string): Promise<IUser | undefined> => {
      const userParams = await makeRequest<
        IUserParamsRequest,
        IUserParamsResponse
      >({
        params: {
          method: "get",
          url: API.settings.users,
          params: {
            action: "get_user_params",
            user_id: userId,
          },
        },
      });

      return userParams?.result?.user_params;
    },
    [makeRequest],
  );

  const createUser = useCallback(async () => {
    const roles = await getRoles();
    const userLogins = await getUsersLogins();

    if (roles?.length === 0) {
      return;
    }

    const modalUser = modal.confirm({
      title: "Создание пользователя",
      footer: null,
      icon: null,
      closable: true,
      width: 600,
      content: null,
    });

    const userData = await new Promise<IUserCreateRequest>((resolve) =>
      modalUser.update({
        content: (
          <FormUserCreate
            roles={roles}
            userLogins={userLogins}
            resolve={resolve}
          />
        ),
      }),
    );

    if (!userData) {
      return;
    }

    await makeRequest<IUserCreateRequest, IResponse>({
      params: {
        method: "post",
        url: API.settings.users,
        data: {
          login: userData?.login,
          password: sha256(userData?.password),
          role_id: userData?.role_id,
        },
      },
    });

    getUsers();

    modalUser.destroy();
  }, [getRoles, getUsersLogins, getUserParams, modal, getUsers, makeRequest]);

  const editUser = useCallback(
    async (userId: string) => {
      const roles = await getRoles();
      const userLogins = await getUsersLogins();

      if (roles?.length === 0) {
        return;
      }

      let userParams: IUser | undefined;

      userParams = await getUserParams(userId);

      if (!userParams) {
        return;
      }

      const modalUser = modal.confirm({
        title: "Редактирование пользователя",
        footer: null,
        icon: null,
        closable: true,
        width: 600,
        content: null,
      });

      const userData = await new Promise<TFormUserEdit>((resolve) =>
        modalUser.update({
          content: (
            <FormUserEdit
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

      let pass = "";
      if (userData?.password) {
        pass = sha256(userData?.password);
      }

      await makeRequest<IUserEditRequest, IResponse>({
        params: {
          method: "patch",
          url: API.settings.users,
          data: {
            login: userData?.login,
            password: pass,
            role_id: userData?.role_id,
            user_id: userId,
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
      await makeRequest<IUserDeleteRequest, IResponse>({
        params: {
          method: "delete",
          url: API.settings.users,
          data: {
            user_id: userId,
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
    () => ({ editUser, delUser, users, createUser }),
    [editUser, delUser, users, createUser],
  );
};
