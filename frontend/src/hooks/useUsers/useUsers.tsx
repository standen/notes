import { useAxios } from "../useAxios";

import { endpoints, IUsersList } from "@/api";

export const useUsers = () => {
  const { data: usersList, refresh: refreshUsers } = useAxios<IUsersList>({
    method: "get",
    url: endpoints.users.allActions,
  });

  return {
    usersList: usersList?.data?.result?.users,
    refreshUsers,
  };
};
