import { useCallback } from "react";

import { useAxios } from "../useAxios";
import { endpoints, INotesList, INoteParams, INote } from "@/api";

import { FormNoteEditParams } from "@/pages/PageNotesEdit/forms";

import { App, Modal } from "antd";

export const useNotes = (noteLink?: string) => {
  const { modal } = App.useApp();

  const { data: notesList, refresh: refreshNotes } = useAxios<INotesList>({
    method: "get",
    url: endpoints.notes.allActions,
  });

  const { data: noteParams } = useAxios<INoteParams>({
    method: "post",
    url: endpoints.notes.allActions,
    data: {
      noteLink,
    },
  });

  const editNoteModal = useCallback(
    async (noteParams?: Partial<INote>) => {
      const result = await new Promise((resolve) => {
        modal.confirm({
          title: "Параметры заметки",
          footer: null,
          icon: null,
          closable: true,
          width: 600,
          content: (
            <FormNoteEditParams getValues={resolve} noteParams={noteParams} />
          ),
        });
      });

      if (!result) {
        return;
      }

      Modal.destroyAll();

      return result;
    },
    [modal]
  );

  return {
    notesList: notesList?.data?.result?.notes,
    refreshNotes,
    noteParams: noteParams?.data?.result?.note,
    editNoteModal,
  };
};
