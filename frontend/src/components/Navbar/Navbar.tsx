import { FC } from "react";

import styles from "./styles.module.scss";

export const Navbar: FC = () => {
  return (
    <section className={styles.navbar}>
      <div className={styles.menu}>
        <a href="">Аккаунты</a>
        <a href="">Заметки</a>
      </div>
    </section>
  );
};
