import { useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

import { IAuthForm, IAuthLoginRespone } from "@/api/types/auth";
import { endpoints } from "@/api";

import { App } from "antd";

export const useAuth = () => {
  const { notification } = App.useApp();
  const navigate = useNavigate();

  const loginAction = useCallback(
    async (value: IAuthForm) => {
      return await axios
        .post<IAuthLoginRespone>(
          endpoints.auth.login,
          {
            login: value.login,
            password: value.password,
          },
          { withCredentials: true }
        )
        .then(() => {
          navigate("/");
        })
        .catch((e) => {
          notification.error({
            message: e?.response?.data?.message || "Ошибка авторизации",
            placement: "topRight",
          });
        });
    },
    [navigate]
  );

  return { loginAction };
};
