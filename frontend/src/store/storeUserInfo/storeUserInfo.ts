import { create } from "zustand";

interface IUser {
  login?: string | undefined;
  allowedActions?: string[];
}

interface store {
  user: IUser;
  setUser: (user: IUser) => void;
  loadingUser: boolean;
  setLoadingUser: (state: boolean) => void;
}

export const storeUserInfo = create<store>()((set) => ({
  user: {
    login: undefined,
    allowedActions: [],
  },
  setUser: (user: IUser) => set({ user }),
  loadingUser: false,
  setLoadingUser: (state: boolean) => set({ loadingUser: state }),
}));
