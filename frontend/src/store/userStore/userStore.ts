import { create } from "zustand";

interface IUser {
  bears: number;
  increase: (by: number) => void;
  rename: (login: string) => void;
  userLogin: string;
  userAllowedActions: string[];
}

export const userStore = create<IUser>()((set) => ({
  userLogin: "123",
  userAllowedActions: [],
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
  rename: (login) => set({ userLogin: login }),
}));
