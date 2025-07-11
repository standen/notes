import { useAxios } from "../useAxios";

import { endpoints, INoteParams } from "@/api";

export const useNoteParams = (noteLink?: string) => {
  const { data: noteParams } = useAxios<INoteParams>({
    method: "post",
    url: noteLink ? endpoints.notes.allActions : undefined,
    data: {
      action: "noteGet",
      noteLink,
    },
  });

  return { noteParams: noteParams?.data?.result?.note };
};
