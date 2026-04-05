import { endpointsSettings } from "@/api/settings";
import { endpointsAuth } from "@/api/auth";
import { endpointsNotes } from "@/api/notes";
import { endpointsSystem } from "@/api/system";

export const API = {
  auth: endpointsAuth,
  settings: endpointsSettings,
  notes: endpointsNotes,
  system: endpointsSystem,
};
