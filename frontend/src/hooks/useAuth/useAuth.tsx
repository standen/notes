import { useCallback, useMemo } from "react";
import { sha256 } from "js-sha256";

import type {
  IResponse,
  IAuthLoginRequest,
  IAuthLogoutRequest,
  IAuthUserInfoRequest,
  IAuthUserInfoResponse,
} from "@/api/generated_types";
import type { TFormAuth } from "@/hooks/useAuth/forms/FormAuth";

import { API } from "@/api";
import { useRequest } from "@/hooks";
import { storeUserInfo } from "@/store";

import { FormAuth } from "@/hooks/useAuth/forms";

import { App } from "antd";

export const useAuth = () => {
  const { modal } = App.useApp();
  const { makeRequest } = useRequest();
  const { setUser } = storeUserInfo();

  const getUserInfo = useCallback(async () => {
    const user = await makeRequest<IAuthUserInfoRequest, IAuthUserInfoResponse>(
      {
        params: {
          method: "get",
          url: API.auth.auth,
          params: { action: "get_user_info" },
        },
      },
    );

    if (!user) {
      return;
    }

    setUser({
      login: user?.result?.user_login,
      allowedActions: user?.result?.user_allowed_actions ?? [],
    });
  }, [makeRequest, setUser]);

  const logout = useCallback(async () => {
    await makeRequest<IAuthLogoutRequest, IResponse>({
      params: {
        method: "post",
        url: API.auth.auth,
        data: { action: "auth_logout" },
      },
    });

    setUser({});
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
      modalAuth.update({ content: <FormAuth resolve={resolve} /> }),
    );

    if (!authData) {
      modalAuth.destroy();
      return;
    }

    const password = sha256(authData.password);

    await makeRequest<IAuthLoginRequest, IResponse>({
      params: {
        method: "post",
        url: API.auth.auth,
        data: {
          password,
          login: authData?.login?.toLocaleLowerCase(),
          action: "auth_login",
        },
      },
    });

    getUserInfo();

    modalAuth.destroy();
  }, [makeRequest, modal, getUserInfo]);

  return useMemo(
    () => ({ auth, getUserInfo, logout }),
    [auth, getUserInfo, logout],
  );
};
