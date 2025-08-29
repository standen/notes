import { useCallback, useMemo } from "react";

import type { IResponseUsersLogins } from "@/api/settings";

import { useRequest } from "@/hooks";
import { API } from "@/api";

import { App } from "antd";

export const useUsers = () => {
  const { modal } = App.useApp();
  const { makeRequest } = useRequest();

  const getUsersLogins = useCallback(async (): Promise<
    string[] | undefined
  > => {
    const usersLogins = await makeRequest<IResponseUsersLogins>({
      params: { method: "get", url: API.settings.allUsersRolesNames },
      customError: "Ошибка при получении списка ранее созданных ролей",
    });

    return usersLogins?.result?.usersLogins ?? [];
  }, [makeRequest]);

  return useMemo(() => ({}), []);
};
