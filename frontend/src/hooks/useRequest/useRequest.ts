import { useCallback, useMemo } from "react";
import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

import type { IResponse } from "@/api/generated_types";

import { storeRequestLoader } from "@/store";
import { useReportError } from "@/hooks";

import { App } from "antd";

export const useRequest = () => {
  const { showErrorNotif } = useReportError();
  const { notification } = App.useApp();
  const { setLoad, setLoadModal } = storeRequestLoader();

  const makeRequest = useCallback(
    async <T, U>(
      indata: {
        params: AxiosRequestConfig<U>;
      },
      isModal?: boolean,
    ): Promise<T | undefined> => {
      isModal ? setLoadModal(true) : setLoad(true);

      try {
        const result = await axios.request<
          IResponse,
          AxiosResponse<IResponse>,
          U
        >({
          ...indata.params,
          withCredentials: true,
        });

        if (result?.data?.message) {
          notification.success({
            title: result?.data?.message,
          });
        }

        return result?.data as T;
      } catch (e) {
        if (axios.isAxiosError(e)) {
          showErrorNotif(e?.response?.data?.message || "Неизвестная ошибка", e);
        } else {
          notification.error({ title: "Неопознанный ответ от сервера" });
        }
      } finally {
        isModal ? setLoadModal(false) : setLoad(false);
      }
    },
    [showErrorNotif, notification, setLoad],
  );

  return useMemo(() => ({ makeRequest }), [makeRequest]);
};
