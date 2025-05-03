import { useCallback } from "react";
import axios from "axios";

import { useAxios } from "../useAxios";
import { FormUserCreateEdit } from "@/pages/PageSettings/components/SettingsUsers/forms";

import { App, Modal } from "antd";
import { endpoints, IUser, IUsersList } from "@/api";

export const useUsers = () => {
  const { modal } = App.useApp();

  const { data: usersList, refresh: refreshUsers } = useAxios<IUsersList>({
    method: "get",
    url: endpoints.users.allActions,
  });

  const createUserAction = useCallback(
    async (userParams: Partial<IUser>, okCallback?: () => void) => {
      const result = await axios.post(endpoints.users.allActions, {
        login: userParams.login,
        password: userParams.password,
        roleId: userParams.role?.id,
      });

      okCallback?.();

      return result;
    },
    []
  );

  const createUserModal = useCallback(
    async (okCallback?: () => void) => {
      const result = await new Promise<Partial<IUser>>((resolve) => {
        modal.confirm({
          title: "Создание пользователя",
          icon: null,
          footer: null,
          content: <FormUserCreateEdit getValues={resolve} />,
          width: 600,
          closable: true,
        });
      });

      if (!result) {
        return;
      }

      await createUserAction(
        {
          login: result.login,
          password: result.password,
          role: result.role,
        },
        okCallback
      );

      Modal.destroyAll();
    },

    [createUserAction, modal]
  );

  const editUserAction = useCallback(
    async (userParams: Partial<IUser>, okCallback?: () => void) => {
      const result = await axios.patch(endpoints.users.allActions, {
        login: userParams.login,
        password: userParams.password,
        roleId: userParams.role?.id,
        userId: userParams.id,
      });

      okCallback?.();

      return result;
    },
    []
  );

  const editUserModal = useCallback(
    async (userParams: Partial<IUser>, okCallback?: () => void) => {
      console.log(userParams, "callback");
      const result = await new Promise<Partial<IUser>>((resolve) => {
        modal.confirm({
          title: "Редактирование пользователя пользователя",
          icon: null,
          footer: null,
          content: (
            <FormUserCreateEdit
              getValues={resolve}
              userParams={{
                login: userParams.login,
                role: userParams.role,
              }}
            />
          ),
          width: 600,
          closable: true,
        });
      });

      if (!result) {
        return;
      }

      await editUserAction(
        {
          id: userParams.id,
          login: result.login,
          password: result.password,
          role: result.role,
        },
        okCallback
      );

      Modal.destroyAll();
    },
    [modal, editUserAction]
  );

  const deleteUserAction = useCallback(
    async (userId: string, okCallback?: () => void) => {
      const result = await axios.delete(endpoints.users.allActions, {
        data: { userId },
      });

      okCallback?.();

      return result;
    },
    []
  );

  return {
    usersList: usersList?.data?.result?.users,
    refreshUsers,
    createUserModal,
    editUserModal,
    deleteUserAction,
  };
};
