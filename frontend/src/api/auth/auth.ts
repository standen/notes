import { BASE_URL } from "@/api/constants";

export const endpointsAuth = {
  login: `${BASE_URL}/auth/login`,
  logout: `${BASE_URL}/auth/logout`,
  userInfo: `${BASE_URL}/auth/userinfo`,
};
