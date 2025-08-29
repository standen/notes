import { useCallback, useMemo } from "react";

import { type IResponseAuthUserInfo } from "@/api/auth";
import type { TFormAuth } from "@/hooks/useAuth/forms/FormAuth";

import { API } from "@/api";
import { useRequest } from "@/hooks";
import { sha256 } from "@/utils";
import { storeUserInfo } from "@/store";

import { FormAuth } from "@/hooks/useAuth/forms";

import { App } from "antd";

export const useAuth = () => {
  const { modal } = App.useApp();
  const { makeRequest } = useRequest();
  const { setUser } = storeUserInfo();

  const getUserInfo = useCallback(async () => {
    const user = await makeRequest<IResponseAuthUserInfo>({
      params: {
        method: "post",
        url: API.auth.userInfo,
      },
      customError: "Ошибка при получении информации о пользователе",
    });

    if (!user) {
      return;
    }

    setUser({
      login: user?.userLogin,
      allowedActions: user?.userAllowedActions ?? [],
    });
  }, [makeRequest, setUser]);

  const logout = useCallback(async () => {
    await makeRequest({
      params: { method: "post", url: API.auth.logout },
      customError: "Ошибка при выходе из профиля",
    });

    getUserInfo();
  }, [getUserInfo, makeRequest]);

  const auth = useCallback(async () => {
    const modalAuth = modal.confirm({
      title: "Авторизация в системе",
      footer: null,
      icon: null,
      closable: true,
      width: 500,
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

    await makeRequest({
      params: {
        method: "post",
        url: API.auth.login,
        data: {
          password,
          login: authData?.login?.toLocaleLowerCase(),
        },
      },
      customError: "Ошибка во время авторизации",
    });

    getUserInfo();

    modalAuth.destroy();
  }, [makeRequest, modal, getUserInfo]);

  return useMemo(
    () => ({ auth, getUserInfo, logout }),
    [auth, getUserInfo, logout]
  );
};
