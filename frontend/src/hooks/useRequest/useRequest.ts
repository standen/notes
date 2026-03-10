import { useCallback, useMemo } from "react";
import axios, { type AxiosRequestConfig } from "axios";

import type { IResponse } from "@/api/types";

import { storeRequestLoader } from "@/store";
import { useReportError } from "@/hooks";

import { App } from "antd";

export const useRequest = () => {
  const { showErrorNotif } = useReportError();
  const { notification } = App.useApp();
  const { setLoad, setLoadModal } = storeRequestLoader();

  const makeRequest = useCallback(
    async <T extends IResponse>(
      indata: {
        params: AxiosRequestConfig;
        customError?: string;
        customSuccess?: string;
      },
      isModal?: boolean,
    ) => {
      isModal ? setLoadModal(true) : setLoad(true);

      try {
        const result = await axios.request<T>({
          ...indata.params,
          withCredentials: true,
        });

        if (result?.data?.message || indata?.customSuccess) {
          notification.success({
            title: result?.data?.message || indata?.customSuccess,
          });
        }

        return result?.data;
      } catch (e) {
        if (axios.isAxiosError(e)) {
          showErrorNotif(
            e?.response?.data?.message || indata?.customError || "Ошибка",
            e,
          );
        } else {
          notification.error({ title: indata?.customError });
        }
      } finally {
        isModal ? setLoadModal(false) : setLoad(false);
      }
    },
    [showErrorNotif, notification, setLoad],
  );

  return useMemo(() => ({ makeRequest }), [makeRequest]);
};
