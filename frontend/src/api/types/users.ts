import { IResponse } from "@/hooks";

export interface IUser {
  id: string;
  login: string;
  role: string;
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
