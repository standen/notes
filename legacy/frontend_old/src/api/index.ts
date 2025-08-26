export * from "./types";
export * from "./endpoints";

import { apiSettings } from "./endpoints/settings";

export const API = {
  settings: apiSettings,
};
