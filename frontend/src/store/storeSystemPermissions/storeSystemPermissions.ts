import { create } from "zustand";

import type { ISystemPermissions } from "@/api/generated_types";

interface store {
  systemPermissions: ISystemPermissions | undefined;
  setSystemPermissions: (
    systemPermissions: ISystemPermissions | undefined,
  ) => void;
}

export const storeSystemPermissions = create<store>()((set) => ({
  systemPermissions: undefined,
  setSystemPermissions: (systemPermissions: ISystemPermissions | undefined) =>
    set({ systemPermissions }),
}));
