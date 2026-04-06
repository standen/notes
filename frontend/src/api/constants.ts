import type {
  ISystemMenuItems,
  IPermissionsList,
  ISystemPermissions,
} from "@/api/generated_types";

import permissions from "../../../backend_django/api/json_schemes/system/PermissionsList.json";
import systemPermissions from "../../../backend_django/api/json_schemes/system/SystemPermissions.json";
import systemMenu from "../../../backend_django/api/json_schemes/system/SystemMenu.json";

export const PORT = import.meta.env.VITE_BACKEND_PORT;
export const BASE_URL = `http://localhost:${PORT}`;

export const _PERMISSIONS = permissions.permissions_list as IPermissionsList;
export const _SYSTEM_MENU = systemMenu as ISystemMenuItems;
export const _SYSTEM_PERMISSIONS = systemPermissions as ISystemPermissions;
