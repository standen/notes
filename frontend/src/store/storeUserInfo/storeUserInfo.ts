import { create } from "zustand";

import type { IPermissionsList } from "@/api/generated_types";

interface IUser {
  login?: string | undefined;
  allowedActions?: IPermissionsList;
}

interface store {
  user: IUser;
  setUser: (user: IUser) => void;
}

export const storeUserInfo = create<store>()((set) => ({
  user: {
    login: undefined,
    allowedActions: [],
  },
  setUser: (user: IUser) => set({ user }),
}));
