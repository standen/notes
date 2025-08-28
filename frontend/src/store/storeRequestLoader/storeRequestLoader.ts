import { create } from "zustand";

interface store {
  load: boolean;
  setLoad: (state: boolean) => void;
}

export const storeRequestLoader = create<store>()((set) => ({
  load: false,
  setLoad: (load: boolean) => set({ load }),
}));
