import { useCallback } from "react";
import axios from "axios";

import { FormRoleCreateEdit } from "@/pages/PageSettings/components/SettingsRoles/forms";
import { endpoints, IRole } from "@/api";

import { App, notification, Modal } from "antd";

export const useRolesActions = () => {
  const { modal } = App.useApp();

  const createRoleAction = useCallback(
    async (roleParams: Partial<IRole>, okCallback?: () => void) => {
      const result = await axios
        .post(endpoints.roles.allActions, roleParams, {
          withCredentials: true,
        })
        .catch((e) => {
          notification.error({
            message: e?.response?.data?.message || "ошибка",
            placement: "topRight",
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
    async (roleParams: IRole, okCallback?: () => void) => {
      const result = await axios.patch(
        endpoints.roles.allActions,
        {
          roleId: roleParams.id,
          name: roleParams.name,
          allowed_actions: roleParams.allowed_actions,
        },
        { withCredentials: true }
      );

      okCallback?.();

      return result;
    },
    []
  );

  const editRoleModal = useCallback(
    async (roleParams: IRole, okCallback?: () => void) => {
      const result = await new Promise<IRole>((resolve) => {
        modal.confirm({
          closable: true,
          footer: null,
          width: 600,
          title: "Изменение роли",
          content: (
            <FormRoleCreateEdit
              getValues={resolve}
              roleParams={{
                name: roleParams.name,
                allowed_actions: roleParams.allowed_actions,
              }}
            />
          ),
        });
      });

      if (!result) {
        return;
      }

      await editRoleModalAction(
        {
          id: roleParams.id,
          name: result.name,
          allowed_actions: result.allowed_actions,
        },
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
        withCredentials: true,
      });

      okCallback?.();

      return result;
    },
    []
  );
  return {
    createRoleModal,
    editRoleModal,
    deleteRoleAction,
  };
};
