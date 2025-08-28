import type { IResponse } from "@/api/types";

interface IRole {
  id: string;
  name: string;
  allowed_actions: string[];
}

export interface IResponsePermissionsList extends IResponse {
  result?: {
    permissions?: string[];
  };
}

export interface IResponseRolesList extends IResponse {
  result?: {
    roles?: IRole[];
  };
}
