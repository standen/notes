import { useCallback, useMemo } from "react";

import { storeUserKey } from "@/store";

import { FormUserKey } from "@/components/UserKey/forms";
import { App, Skeleton } from "antd";

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

    setKey(key);

    notification.success({ title: "Ключ успешко установлен" });

    modalUserKey.destroy();
  }, []);

  return useMemo(() => ({ keySet }), [keySet]);
};
