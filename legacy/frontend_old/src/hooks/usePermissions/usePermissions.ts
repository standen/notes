import { useAxios } from "../useAxios";
import { IPermissionsList } from "@/api";

import { endpoints } from "@/api";

export const usePermissions = () => {
  const { data, error, loading } = useAxios<IPermissionsList>({
    method: "get",
    url: endpoints.permissions.allActions,
  });

  return {
    permissionsList: data?.data?.result?.allowed_actions,
    permissionsError: error,
    permissionsLoad: loading,
  };
};
