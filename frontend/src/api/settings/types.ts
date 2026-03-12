import { type IResponse } from "@/api/types";

type TPermissions =
  | "NOTE_DELETE"
  | "NOTE_CREATE"
  | "NOTE_READ"
  | "NOTE_ACCESS"
  | "ACCOUNT_CREATE"
  | "ACCOUNT_READ"
  | "ACCOUNT_DELETE"
  | "ACCOUNT_ACCESS"
  | "EVENT_CREATE"
  | "EVENT_READ"
  | "EVENT_DELETE"
  | "EVENT_ACCESS"
  | "SETTINGS_ACCESS"
  | "SETTINGS_GLOBALS_ACCESS"
  | "SETTINGS_USERS_ACCESS"
  | "SETTINGS_ROLES_ACCESS"
  | "SETTINGS_USER_CREATE"
  | "SETTINGS_USER_UPDATE"
  | "SETTINGS_USER_DELETE"
  | "SETTINGS_ROLE_CREATE"
  | "SETTINGS_ROLE_UPDATE"
  | "SETTINGS_ROLE_DELETE";

export type IPermissionsList = TPermissions[];

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

export interface IUser {
  id: string;
  login: string;
  password: string;
  role: {
    id: string;
    name: string;
  };
}

export interface IResponseUsersLogins extends IResponse {
  result?: {
    usersLogins?: string[];
  };
}

export interface IResponseUserParams extends IResponse {
  result?: {
    userParams?: IUser;
  };
}

export interface IResponseUsersList extends IResponse {
  result?: {
    users?: IUser[];
  };
}
