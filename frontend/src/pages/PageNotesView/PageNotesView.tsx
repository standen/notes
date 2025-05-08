import { useParams } from "react-router";

import { Card } from "@/ui";

import style from "./styles.module.scss";

export const PageNotesView = () => {
  const { noteUrl } = useParams();

  return (
    <section className={style.main}>
      <Card>{noteUrl}</Card>
    </section>
  );
};
