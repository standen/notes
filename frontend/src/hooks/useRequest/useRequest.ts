import axios, { AxiosRequestConfig } from "axios";
import { useCallback, useMemo } from "react";

export const useRequest = () => {
  const makeRequest = useCallback(
    async <T>(
      params: AxiosRequestConfig,
      customError?: string,
      loadCallback?: (load: boolean) => void,
      customSuccess?: string
    ) => {
      loadCallback?.(true);

      try {
        const result = await axios.request<T>(params);

        if (customSuccess) {
          console.log(customSuccess);
        }

        return result?.data;
      } catch (e) {
        if (axios.isAxiosError(e)) {
          console.log(e?.response?.data);
        } else {
          console.log(customError);
        }
      } finally {
        loadCallback?.(false);
      }
    },
    []
  );

  return useMemo(() => ({ makeRequest }), [makeRequest]);
};
