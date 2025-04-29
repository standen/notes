import { useCallback } from "react";

import { ModalRoleCreate } from "../modals";

import { Modal } from "antd";

export const useRoles = () => {
  const createRole = useCallback(async () => {
    const result = await Modal.confirm({
      title: "Создать роль",
      content: <ModalRoleCreate />,
      okText: "Создать",
      cancelText: "Отмена",
      type: "success",
    });
    console.log(result);
  }, []);
  return { createRole };
};
