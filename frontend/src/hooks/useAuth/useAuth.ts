import { useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

import { MenuItems } from "@/router";

import { IAuthForm } from "@/api/types/auth";
import { IResponse } from "../useAxios";
import { endpoints } from "@/api";
import { sha256 } from "@/utils";

import { App } from "antd";

export const useAuth = () => {
  const { notification } = App.useApp();
  const navigate = useNavigate();

  const loginAction = useCallback(
    async (value: IAuthForm) => {
      const password = await sha256(value.password);

      return await axios
        .post<IResponse>(
          endpoints.auth.login,
          {
            login: value.login.toLowerCase(),
            password,
          },
          { withCredentials: true }
        )
        .then(() => {
          navigate(MenuItems.PageAccounts.link);
        })
        .catch((e) => {
          notification.error({
            message: e?.response?.data?.message || "Ошибка авторизации",
            placement: "topRight",
          });
        });
    },
    [navigate, notification]
  );

  return { loginAction };
};
