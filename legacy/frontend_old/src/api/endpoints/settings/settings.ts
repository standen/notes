import { BASE_URL, IResponse } from "@/api/constants";

export const apiSettings = {
  getPermissions: `${BASE_URL}/settings/permissions`,
  rolesActions: `${BASE_URL}/settings/roles`,
  getRolesNames: `${BASE_URL}/settings/roles?filter=rolesNames`,
  usersActions: `${BASE_URL}/settings/users`,
  getUsersLogins: `${BASE_URL}/settings/users?filter=logins`,
};

export interface IResponsePermissionsList extends IResponse {
  result?: {
    permissions?: string[];
  };
}

export interface IRole {
  id: string;
  name: string;
  allowed_actions: string[];
}

export interface IResponseRolesList extends IResponse {
  result?: {
    roles?: IRole[];
  };
}
