import { FC } from "react";

import styles from "./styles.module.scss";

export const Header: FC = () => {
  return (
    <>
      <div className={styles.logo}>notes</div>
      <div className={styles.content}>456</div>
    </>
  );
};
