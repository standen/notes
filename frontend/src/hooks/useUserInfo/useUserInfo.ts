import { useAxios } from "../useAxios";

import { endpoints } from "@/api";
import { IUserInfo } from "@/api/types/auth";

export const useUserInfo = () => {
  const { data: userInfo } = useAxios<IUserInfo>({
    method: "post",
    url: endpoints.auth.userInfo,
  });

  return { userInfo: userInfo?.data?.result };
};
