import { useCallback } from "react";
import axios from "axios";

import { FormRoleCreateEdit } from "@/pages/PageSettings/components/SettingsRoles/forms/FormRoleCreateEdit";
import { useAxios } from "../useAxios";

import { App, notification } from "antd";
import { endpoints, IRolesList } from "@/api";

export const useRoles = () => {
  const { modal } = App.useApp();

  const { data: rolesList, refresh: refreshRoles } = useAxios<IRolesList>({
    method: "get",
    url: endpoints.roles.allActions,
  });

  const createRoleModal = useCallback(async () => {
    return await modal.confirm({
      title: "Создание роли",
      icon: null,
      footer: null,
      content: <FormRoleCreateEdit />,
      width: 600,
      closable: true,
    });
  }, [modal]);

  const createRoleAction = useCallback(
    async (
      value?: { roleName: string; rolesList: string[] },
      okCallback?: () => void
    ) => {
      const result = await axios
        .post(endpoints.roles.allActions, value, {
          withCredentials: true,
        })
        .catch((e) => {
          notification.error({
            message: e?.response?.data?.message || "ошибка",
            placement: "bottomRight",
          });
        });

      okCallback?.();

      return result;
    },
    []
  );

  const editRoleModalAction = useCallback(
    async (
      roleId: string,
      roleName: string,
      rolesList: string[],
      okCallback?: () => void
    ) => {
      const result = await axios.patch(endpoints.roles.allActions, {
        roleId: roleId,
        name: roleName,
        allowed_actions: rolesList,
      });

      okCallback?.();

      return result;
    },
    []
  );

  const editRoleModal = useCallback(
    async (
      roleId: string,
      roleName: string,
      rolesList: string[],
      okCallback?: () => void
    ) => {
      const result = await modal.confirm({
        title: "Изменение роли",
        content: <FormRoleCreateEdit />,
      });

      console.log(result);

      if (!result) {
        return;
      }

      await editRoleModalAction(roleId, roleName, rolesList, okCallback);
    },
    [modal, editRoleModalAction]
  );

  return {
    rolesList: rolesList?.data?.result?.roles,
    refreshRoles,
    createRoleAction,
    createRoleModal,
    editRoleModal,
  };
};
