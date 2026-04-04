import { useCallback, useMemo } from "react";

import { storeUserKey } from "@/store";

import { FormUserKey } from "@/components/UserKey/forms";
import { App, Skeleton, Modal } from "antd";

export const useUserKey = () => {
  const { modal, notification } = App.useApp();
  const { setKey } = storeUserKey();

  const keySet = useCallback(async () => {
    const modalUserKey = modal.confirm({
      title: "Создание роли",
      footer: null,
      icon: null,
      closable: true,
      width: 600,
      content: <Skeleton active />,
    });

    const key = await new Promise((resolve) =>
      modalUserKey.update({ content: <FormUserKey resolve={resolve} /> }),
    );

    // @ts-expect-error
    setKey(key || "");

    notification.success({ title: "Ключ успешко установлен" });

    modalUserKey.destroy();
  }, [modal, notification]);

  const keyDelete = useCallback(() => {
    setKey("");
    notification.success({ title: "Ключ успешно удален" });
    Modal.destroyAll();
  }, []);

  return useMemo(() => ({ keySet, keyDelete }), [keySet, keyDelete]);
};
