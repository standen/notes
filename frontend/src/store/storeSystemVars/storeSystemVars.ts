import { create } from "zustand";

import type {
  ISystemPermissions,
  ISystemMenuItems,
} from "@/api/generated_types";

interface store {
  systemPermissions: ISystemPermissions | undefined;
  setSystemPermissions: (
    systemPermissions: ISystemPermissions | undefined,
  ) => void;

  systemMenu: ISystemMenuItems | undefined;
  setSystemMenu: (systemMenu: ISystemMenuItems | undefined) => void;
}

export const storeSystemVars = create<store>()((set) => ({
  systemPermissions: undefined,
  setSystemPermissions: (systemPermissions: ISystemPermissions | undefined) =>
    set({ systemPermissions }),

  systemMenu: undefined,
  setSystemMenu: (systemMenu: ISystemMenuItems | undefined) =>
    set({ systemMenu }),
}));
