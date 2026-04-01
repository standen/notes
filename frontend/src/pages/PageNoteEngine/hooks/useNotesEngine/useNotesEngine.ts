import { useMemo, useCallback } from "react";

import type {
  INoteCreateRequest,
  INoteEditRequest,
  INoteDeleteRequest,
  INoteParamsRequest,
  INoteParamsResponse,
  INotesLinksRequest,
  INotesLinksResponse,
  INote,
} from "@/api/generated_types";

import { useRequest } from "@/hooks";
import { API } from "@/api";
import { Meta } from "react-router";

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
    async (noteId?: string, noteLink?: string): Promise<INote> => {
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
