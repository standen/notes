import { useCallback, useState } from "react";
import axios from "axios";

import { ModalRoleCreate } from "../modals";

import { App } from "antd";

export const useRoles = () => {
  const { modal } = App.useApp();

  const createRoleModal = useCallback(async () => {
    return await modal.confirm({
      title: "Создание роли",
      icon: null,
      footer: null,
      content: <ModalRoleCreate />,
      width: 600,
      closable: true,
    });
  }, [modal]);

  const createRoleAction = useCallback(
    async (value?: { roleName: string; rolesList: string[] }) => {
      await axios.post()
    },
    []
  );

  return { createRoleAction, createRoleModal };
};
