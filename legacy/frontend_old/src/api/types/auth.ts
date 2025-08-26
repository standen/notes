import { IResponse } from "@/hooks";

export interface IAuthForm {
  login: string;
  password: string;
}

export interface IUserInfo extends IResponse {
  result?: {
    userLogin?: string;
    userAllowedActions?: string[];
  };
}
