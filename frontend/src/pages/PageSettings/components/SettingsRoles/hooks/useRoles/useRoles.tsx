import { useCallback, useEffect, useMemo, useState } from "react";

import { API } from "@/api";
import {
  IResponseRolesList,
  IRole,
  IResponsePermissionsList,
} from "@/api/endpoints/settings";

import { useRequest } from "@/hooks";

export const useRoles = () => {
  const [roles, setRoles] = useState<IRole[]>();

  const { makeRequest } = useRequest();

  const getPermissions = useCallback(async (): Promise<string[]> => {
    const req = await makeRequest<IResponsePermissionsList>({
      method: "get",
      url: API.settings.getPermissions,
    });

    if (!req) {
      return [];
    }

    return req?.result?.permissions ?? [];
  }, [makeRequest]);

  const getRoles = useCallback(async () => {
    const req = await makeRequest<IResponseRolesList>({
      method: "get",
      url: API.settings.rolesActions,
    });

    if (!req) {
      return;
    }

    setRoles(req?.result?.roles ?? []);

    return req?.result?.roles;
  }, [makeRequest, setRoles]);

  useEffect(() => {
    getRoles();
  }, []);

  return useMemo(
    () => ({ roles, getRoles, getPermissions }),
    [roles, getRoles, getPermissions]
  );
};
