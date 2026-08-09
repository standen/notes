import { useCallback, useEffect, useMemo, useState } from "react";

import type {
  INoteForTable,
  INotesListRequest,
  INotesListResponse,
} from "@/api/generated_types";

import { storeUserInfo } from "@/store";

import { API } from "@/api";
import { useRequest } from "@/hooks";

export const useNotesList = () => {
  const { user } = storeUserInfo();
  const { makeRequest } = useRequest();

  const [notes, setNotes] = useState<INoteForTable[]>([]);

  const getNotes = useCallback(async (): Promise<
    INoteForTable[] | React.ReactNode
  > => {
    const notes = await makeRequest<INotesListRequest, INotesListResponse>({
      params: {
        method: "get",
        url: API.notes.notes,
        params: { filter: "all", action: "get_notes_list" },
      },
    });

    setNotes(notes?.result?.notes ?? []);
    return notes?.result?.notes ?? [];
  }, [makeRequest]);

  useEffect(() => {
    getNotes();
  }, [getNotes, user]);

  return useMemo(() => ({ notes }), [notes]);
};
