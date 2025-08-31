import { endpointsSettings } from "@/api/settings";
import { endpointsAuth } from "@/api/auth";
import { endpointsNotes } from "@/api/notes";

export const API = {
  auth: endpointsAuth,
  settings: endpointsSettings,
  notes: endpointsNotes,
};
