import { useCallback } from "react";

import { INote } from "@/api";
import { FormNoteEditParams } from "@/pages/PageNotesEdit/forms";

import { App, Modal } from "antd";

export const useNotesActions = () => {
  const { modal } = App.useApp();

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
  
  return { editNoteModal };
};
