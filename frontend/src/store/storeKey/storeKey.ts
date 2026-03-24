import { create } from "zustand";

interface store {
  key: string;
  setKey: (state: string) => void;
}

export const storeRequestLoader = create<store>()((set) => ({
  key: "",
  setKey: (key: string) => set({ key }),
}));
