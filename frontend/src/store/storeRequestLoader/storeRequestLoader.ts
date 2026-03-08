import { create } from "zustand";

interface store {
  load: boolean;
  setLoad: (state: boolean) => void;
  loadModal: boolean;
  setLoadModal: (state: boolean) => void;
}

export const storeRequestLoader = create<store>()((set) => ({
  load: false,
  setLoad: (load: boolean) => set({ load }),
  loadModal: false,
  setLoadModal: (loadModal: boolean) => set({ loadModal }),
}));
