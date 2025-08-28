import { useCallback, useMemo } from "react";

import type { TFormAuth } from "@/hooks/useAuth/forms/FormAuth/types";

import { API } from "@/api";
import { useRequest } from "@/hooks";
import { sha256 } from "@/utils";

import { FormAuth } from "@/hooks/useAuth/forms";

import { App } from "antd";

export const useAuth = () => {
  const { modal } = App.useApp();
  const { makeRequest } = useRequest();

  const auth = useCallback(async () => {
    const modalAuth = modal.confirm({
      title: "Авторизация в системе",
      footer: null,
      icon: null,
      closable: true,
      width: 600,
      content: null,
    });

    const authData = await new Promise<TFormAuth>((resolve) =>
      modalAuth.update({ content: <FormAuth resolve={resolve} /> })
    );

    if (!authData) {
      modalAuth.destroy();
      return;
    }

    const password = await sha256(authData.password);

    await makeRequest(
      {
        method: "post",
        url: API.auth.login,
        data: {
          password,
          login: authData.login,
        },
      },
      "Ошибка во время авторизации"
    );

    modalAuth.destroy();
  }, [makeRequest, modal]);

  return useMemo(() => ({ auth }), [auth]);
};
