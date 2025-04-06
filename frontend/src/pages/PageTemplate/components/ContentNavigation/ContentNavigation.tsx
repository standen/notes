import { FC } from "react";

import { TContentNavigation } from "./types";
import styles from "./styles.module.scss";

export const ContentNavigation: FC<TContentNavigation> = (props) => {
  const { title } = props;
  return (
    <section className={styles.content_nav}>
      <div className={styles.title}>{title}</div>
      <div>123</div>
    </section>
  );
};
