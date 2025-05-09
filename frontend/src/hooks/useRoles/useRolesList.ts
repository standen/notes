import { useAxios } from "../useAxios";

import { endpoints, IRolesList } from "@/api";

export const useRolesList = () => {
  const { data: rolesList, refresh: refreshRoles } = useAxios<IRolesList>({
    method: "get",
    url: endpoints.roles.allActions,
  });

  return {
    rolesList: rolesList?.data?.result?.roles,
    refreshRoles,
  };
};
