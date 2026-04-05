import { useCallback, useMemo } from "react";

import type {
  ISystemMenuRequest,
  ISystemMenuResponse,
  ISystemPermissionsRequest,
  ISystemPermissionsResponse,
} from "@/api/generated_types";

import { API } from "@/api";
import { storeSystemVars } from "@/store";
import { useRequest } from "@/hooks";

export const useSystemVars = () => {
  const { makeRequest } = useRequest();
  const { setSystemMenu, setSystemPermissions } = storeSystemVars();

  const getSystemPermissions = useCallback(async () => {
    const perms = await makeRequest<
      ISystemPermissionsRequest,
      ISystemPermissionsResponse
    >({
      params: {
        method: "get",
        url: API.system.system,
        params: {
          action: "get_system_permissions",
        },
      },
    });

    setSystemPermissions(perms?.result?.system_permissions);
  }, [makeRequest]);

  const getSystemMenu = useCallback(async () => {
    const menu = await makeRequest<ISystemMenuRequest, ISystemMenuResponse>({
      params: {
        method: "get",
        url: API.system.system,
        params: {
          action: "get_system_menu",
        },
      },
    });

    setSystemMenu(menu?.result?.system_menu);
  }, [makeRequest]);

  return useMemo(
    () => ({ getSystemPermissions, getSystemMenu }),
    [getSystemPermissions, getSystemMenu],
  );
};
