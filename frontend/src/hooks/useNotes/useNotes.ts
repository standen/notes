import { useAxios } from "../useAxios";
import { endpoints, INotesList } from "@/api";

export const useNotes = () => {
  const { data: notesList, refresh: refreshNotes } = useAxios<INotesList>({
    method: "get",
    url: endpoints.notes.allActions,
  });

  return {
    notesList: notesList?.data?.result?.notes,
    refreshNotes,
  };
};
