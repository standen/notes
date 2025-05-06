import { useParams } from "react-router";

import { Card } from "@/ui";

import style from "./styles.module.scss";

export const PageNotesView = () => {
  const urlParams = useParams();

  return (
    <section className={style.main}>
      <Card>{urlParams?.noteUrl}</Card>
    </section>
  );
};
