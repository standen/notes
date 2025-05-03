import { useCallback } from "react";
import axios from "axios";

import { FormRoleCreateEdit } from "@/pages/PageSettings/components/SettingsRoles/forms"; 
import { useAxios } from "../useAxios";

import { App, notification, Modal } from "antd";
import { endpoints, IRolesList, IRole } from "@/api";

export const useRoles = () => {
  const { modal } = App.useApp();

  const { data: rolesList, refresh: refreshRoles } = useAxios<IRolesList>({
    method: "get",
    url: endpoints.roles.allActions,
  });

  const createRoleAction = useCallback(
    async (value: Partial<IRole>, okCallback?: () => void) => {
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

  const createRoleModal = useCallback(
    async (okCallback?: () => void) => {
      const result = await new Promise<Partial<IRole>>((resolve) => {
        modal.confirm({
          title: "Создание роли",
          icon: null,
          footer: null,
          content: <FormRoleCreateEdit getValues={resolve} />,
          width: 600,
          closable: true,
        });
      });

      if (!result) {
        return;
      }

      await createRoleAction(
        { name: result.name, allowed_actions: result.allowed_actions },
        okCallback
      );

      Modal.destroyAll();
    },
    [modal, createRoleAction]
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
      const result = await new Promise<IRole>((resolve) => {
        modal.confirm({
          closable: true,
          footer: null,
          width: 600,
          title: "Изменение роли",
          content: (
            <FormRoleCreateEdit
              getValues={resolve}
              roleParams={{ name: roleName, allowed_actions: rolesList }}
            />
          ),
        });
      });

      if (!result) {
        return;
      }

      await editRoleModalAction(
        roleId,
        result?.name,
        result?.allowed_actions,
        okCallback
      );

      Modal.destroyAll();
    },
    [modal, editRoleModalAction]
  );

  const deleteRoleAction = useCallback(
    async (roleId: string, okCallback?: () => void) => {
      const result = await axios.delete(endpoints.roles.allActions, {
        data: { roleId },
      });

      okCallback?.();

      return result;
    },
    []
  );

  return {
    rolesList: rolesList?.data?.result?.roles,
    refreshRoles,
    createRoleModal,
    editRoleModal,
    deleteRoleAction,
  };
};
