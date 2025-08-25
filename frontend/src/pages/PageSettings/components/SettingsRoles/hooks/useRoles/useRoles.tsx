import { useCallback, useEffect, useMemo, useState } from "react";

import { API } from "@/api";
import { IResponseRolesList, IRole } from "@/api/endpoints/settings";

import { useRequest } from "@/hooks";

export const useRoles = () => {
  const [roles, setRoles] = useState<IRole[]>();

  const { makeRequest } = useRequest();

  const getRoles = useCallback(async () => {
    const req = await makeRequest<IResponseRolesList>({
      method: "get",
      url: API.settings.rolesActions,
    });

    if (!req) {
      return;
    }

    setRoles(req?.result?.roles);

    return req?.result?.roles;
  }, [makeRequest, setRoles]);

  useEffect(() => {
    getRoles();
  }, []);

  return useMemo(() => ({ roles, getRoles }), [roles, getRoles]);
};
