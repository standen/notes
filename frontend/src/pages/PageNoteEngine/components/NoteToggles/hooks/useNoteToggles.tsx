import { useCallback, useMemo, useState } from "react";

interface INoteTogglesState {
  cipher: boolean;
  open: boolean;
  edit: boolean;
}

export const useNoteToggles = (prevState?: INoteTogglesState) => {
  const [cipher, setCipher] = useState<boolean>(prevState?.cipher ?? false);
  const [open, setOpen] = useState<boolean>(prevState?.open ?? false);
  const [edit, setEdit] = useState<boolean>(prevState?.edit ?? false);

  const changeOpen = useCallback(() => setOpen(!open), [open]);

  const changeEdit = useCallback(() => setEdit(!edit), [edit]);

  const changeCipher = useCallback(() => setCipher(!cipher), [cipher]);

  return useMemo(
    () => ({ cipher, open, edit, changeOpen, changeEdit, changeCipher }),
    [cipher, open, edit, changeOpen, changeEdit, changeCipher],
  );
};
