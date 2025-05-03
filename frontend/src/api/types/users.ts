import { IResponse } from "@/hooks";
import { IRole } from "./roles";

export interface IUser {
  id: string;
  login: string;
  password?: string;
  role: Partial<IRole>
}

export interface IUsersList extends IResponse {
  result: {
    users: IUser[];
  };
}

export interface IUserCreate extends IResponse {
  result: null;
}

export interface IUserUpdate extends IResponse {
  result: null;
}
