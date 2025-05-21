import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const useAxios = <T>(params: AxiosRequestConfig) => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<AxiosResponse<T>>();

  const fetchData = async (params: AxiosRequestConfig) => {
    setLoading(true);
    await axios
      .request<T>({ withCredentials: true, ...params })
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  };

  const refresh = () => {
    fetchData(params);
  };

  useEffect(() => {
    if (params.url && params.method) {
      fetchData(params);
    }
  }, [params.method, params.url]);

  return { data, loading, error, refresh };
};
