import { type IResponse } from "@/api/types";

export interface IRole {
  id: string;
  name: string;
  allowed_actions: string[];
}

export interface IResponsePermissionsList extends IResponse {
  result?: {
    permissions?: string[];
  };
}

export interface IResponseRolesNames extends IResponse {
  result?: {
    rolesNames?: string[];
  };
}

export interface IResponseRolesList extends IResponse {
  result?: {
    roles?: IRole[];
  };
}

export interface IResponseRoleParams extends IResponse {
  result?: {
    roleParams?: IRole;
  };
}

export interface IResponseUsersLogins extends IResponse {
  result?: {
    usersLogins?: string[];
  };
}
