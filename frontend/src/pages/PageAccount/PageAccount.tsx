import { FC } from "react";

import { ContentNavigation } from "../PageTemplate/components";
import { Button } from "@/ui";

import styles from "./styles.module.scss";

export const PageAccount: FC = () => {
  return (
    <section className={styles.accounts}>
      <ContentNavigation title="Аккаунты" />
      <Button type="danger"></Button>
      <Button type="primary"></Button>
      <Button type="success"></Button>
      <Button type="warning"></Button>
    </section>
  );
};
