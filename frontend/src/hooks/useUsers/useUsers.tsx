import { useCallback } from "react";
import axios from "axios";

import { useAxios } from "../useAxios";
import { FormUserCreateEdit } from "@/pages/PageSettings/components/SettingsUsers/forms";

import { App, notification, Modal } from "antd";
import { endpoints, IUser, IUsersList } from "@/api";

export const useUsers = () => {
  const { modal } = App.useApp();

  const { data: usersList, refresh: refreshUsers } = useAxios<IUsersList>({
    method: "get",
    url: endpoints.users.allActions,
  });

  const createUserAction = useCallback(async (okCallback?: () => void) => {
    const result = await axios.post(endpoints.users.allActions);

    okCallback?.();

    return result;
  }, []);

  const createUserModal = useCallback(async () => {
    const result = await new Promise((resolve) => {
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

    await createUserAction();

    Modal.destroyAll();
  }, [createUserAction, modal]);

  return {
    usersList: usersList?.data?.result?.users,
    refreshUsers,
    createUserModal,
  };
};
