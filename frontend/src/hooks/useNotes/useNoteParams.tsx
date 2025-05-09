import { useAxios } from "../useAxios";

import { endpoints, INoteParams } from "@/api";

export const useNoteParams = (noteLink?: string) => {
  const { data: noteParams } = useAxios<INoteParams>({
    method: "post",
    url: endpoints.notes.allActions,
    data: {
      noteLink,
    },
  });

  return { noteParams: noteParams?.data?.result?.note };
};
