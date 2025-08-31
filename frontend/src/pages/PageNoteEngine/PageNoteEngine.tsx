import type { FC } from "react";
import { useParams } from "react-router";

import { Loader } from "@/components";

export const PageNoteEngine: FC = () => {
  const { noteLink } = useParams();

  return <Loader>{noteLink}</Loader>;
};
