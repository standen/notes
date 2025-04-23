import { IResponse } from "@/hooks";

export interface IRole {
  id: string;
  name: string;
  allowed_actions: string[];
}

export interface IRolesList extends IResponse {
  result: {
    roles: IRole[];
  };
}

export interface IRoleCreate extends IResponse {
  result: null;
}

export interface IRoleUpdate extends IResponse {
  result: null;
}
