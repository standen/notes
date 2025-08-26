import { create } from "zustand";

interface store {
  selectedPage: string | null;
  setSelectedPage: (selectedPage: string | null) => void;
}

export const storeNavMenu = create<store>()((set) => ({
  selectedPage: null,
  setSelectedPage: (selectedPage) => set({ selectedPage }),
}));
