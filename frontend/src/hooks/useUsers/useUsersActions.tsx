import { useCallback } from "react";
import axios from "axios";

import { endpoints, IUser, IUserFormValues } from "@/api";
import { FormUserCreateEdit } from "@/pages/PageSettings/components/SettingsUsers/forms";

import { sha256 } from "@/utils";

import { App, Modal } from "antd";

export const useUsersActions = () => {
  const { modal } = App.useApp();

  const createUserAction = useCallback(
    async (userParams: Partial<IUser>, okCallback?: () => void) => {
      const password = await sha256(userParams.password);
      const result = await axios.post(
        endpoints.users.allActions,
        {
          login: userParams.login,
          password,
          roleId: userParams.role?.id,
        },
        { withCredentials: true }
      );

      okCallback?.();

      return result;
    },
    []
  );

  const createUserModal = useCallback(
    async (okCallback?: () => void) => {
      const result = await new Promise<IUserFormValues>((resolve) => {
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
          role: {
            id: result.roleId,
          },
        },
        okCallback
      );

      Modal.destroyAll();
    },

    [createUserAction, modal]
  );

  const editUserAction = useCallback(
    async (userParams: Partial<IUser>, okCallback?: () => void) => {
      const password = await sha256(userParams.password);
      const result = await axios.patch(
        endpoints.users.allActions,
        {
          login: userParams.login,
          password,
          roleId: userParams.role?.id,
          userId: userParams.id,
        },
        { withCredentials: true }
      );

      okCallback?.();

      return result;
    },
    []
  );

  const editUserModal = useCallback(
    async (userParams: Partial<IUser>, okCallback?: () => void) => {
      const result = await new Promise<Partial<IUserFormValues>>((resolve) => {
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
          role: { id: result.roleId },
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
        withCredentials: true,
      });

      okCallback?.();

      return result;
    },
    []
  );
  return {
    createUserModal,
    editUserModal,
    deleteUserAction,
  };
};
