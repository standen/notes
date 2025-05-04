import { IResponse } from "@/hooks";

export interface IAuthForm {
  login: string;
  password: string;
}

export interface IAuthLoginRespone extends IResponse {
  result: null;
}
