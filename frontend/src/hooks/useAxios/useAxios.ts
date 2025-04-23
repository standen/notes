import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const useAxios = (params: AxiosRequestConfig) => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<AxiosResponse>();

  const fetchData = async (params: AxiosRequestConfig) => {
    setLoading(true);
    await axios
      .request(params)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  };

  const refresh = () => {
    fetchData(params);
  };

  useEffect(() => {
    fetchData(params);
  }, [params]);

  return { data, loading, error, refresh };
};
