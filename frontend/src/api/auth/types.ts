import type { IResponse } from "@/api/types";

export interface IResponseAuthUserInfo extends IResponse {
  userLogin?: string;
  userAllowedActions?: string[];
}
