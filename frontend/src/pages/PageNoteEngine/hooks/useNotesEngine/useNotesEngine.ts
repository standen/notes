import { useCallback, useMemo } from "react";

import type {
  INote,
  INoteParamsRequest,
  INoteParamsResponse,
  INotesLinksRequest,
  INotesLinksResponse,
} from "@/api/generated_types";

import { API } from "@/api";
import { useRequest } from "@/hooks";

export const useNotesEngine = () => {
  const { makeRequest } = useRequest();

  const getNotesLinks = useCallback(async (): Promise<string[]> => {
    const notesLinks = await makeRequest<
      INotesLinksRequest,
      INotesLinksResponse
    >({
      params: {
        method: "get",
        url: API.notes.notes,
        params: {
          action: "get_notes_links",
        },
      },
    });

    return notesLinks?.result?.notes_links ?? [];
  }, [makeRequest]);

  const getNoteParams = useCallback(
    async (noteId?: string, noteLink?: string): Promise<INote | undefined> => {
      const note = await makeRequest<INoteParamsRequest, INoteParamsResponse>({
        params: {
          method: "get",
          url: API.notes.notes,
          params: {
            action: "get_note_params",
            note_id: noteId,
            note_link: noteLink,
          },
        },
      });

      return note?.result?.note;
    },
    [],
  );

  const noteCreate = useCallback(async () => {}, []);

  const noteEdit = useCallback(async () => {}, []);

  const noteDelete = useCallback(async () => {}, []);

  return useMemo(
    () => ({ getNoteParams, getNotesLinks, noteCreate, noteEdit, noteDelete }),
    [getNoteParams, getNotesLinks, noteCreate, noteEdit, noteDelete],
  );
};
