import { useCallback, useEffect, useMemo, useState } from "react";

import type { IResponseNotesList, INoteForTable } from "@/api/notes";

import { useRequest } from "@/hooks";
import { API } from "@/api";

export const useNotes = () => {
  const { makeRequest } = useRequest();

  const [notes, setNotes] = useState<INoteForTable[]>([]);

  const getNotes = useCallback(async (): Promise<INoteForTable[]> => {
    const notes = await makeRequest<IResponseNotesList>({
      params: { method: "get", url: API.notes.notes },
    });

    setNotes(notes?.result?.notes ?? []);
    return notes?.result?.notes ?? [];
  }, [makeRequest]);

  useEffect(() => {
    getNotes();
  }, [getNotes]);

  return useMemo(() => ({ notes }), [notes]);
};
