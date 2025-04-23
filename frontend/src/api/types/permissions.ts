import { IResponse } from "@/hooks";

export interface IPermissionsList extends IResponse {
  result: {
    allowed_actions: string[];
  };
}
