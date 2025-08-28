import { useCallback, useMemo } from "react";
import axios, { type AxiosRequestConfig } from "axios";

import { useReportError } from "@/hooks";

import { App } from "antd";

export const useRequest = () => {
  const { showErrorNotif } = useReportError();

  const { notification } = App.useApp();

  const makeRequest = useCallback(
    async <T>(
      params: AxiosRequestConfig,
      customError?: string,
      loadCallback?: (load: boolean) => void,
      customSuccess?: string
    ) => {
      loadCallback?.(true);

      try {
        const result = await axios.request<T>({
          ...params,
          withCredentials: true,
        });

        if (customSuccess) {
          notification.success({ message: customSuccess });
        }

        return result?.data;
      } catch (e) {
        console.log(e);
        if (axios.isAxiosError(e)) {
          showErrorNotif(customError || "Ошибка", e);
        } else {
          notification.error({ message: customError });
        }
      } finally {
        loadCallback?.(false);
      }
    },
    [showErrorNotif, notification]
  );

  return useMemo(() => ({ makeRequest }), [makeRequest]);
};
