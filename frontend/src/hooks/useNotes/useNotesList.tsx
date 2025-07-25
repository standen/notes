import { useAxios } from "../useAxios";
import { endpoints, INotesList } from "@/api";

export const useNotesList = () => {
  const { data: notesList, refresh: refreshNotes } = useAxios<INotesList>({
    method: "get",
    url: endpoints.notes.allActions,
  });

  return {
    notesList: notesList?.data?.result?.notes,
    refreshNotes,
  };
};
