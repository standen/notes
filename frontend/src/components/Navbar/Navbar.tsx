import { FC } from "react";

import styles from "./styles.module.scss";

export const Navbar: FC = () => {
  return (
    <section className={styles.navbar}>
      <div className={styles.menu}>
        <a href="">
          <i className="fa-solid fa-user"></i>
          <span>Аккаунты</span>
        </a>
        <a href="" className={styles.active}>
          <i className="fa-solid fa-file-pen"></i>
          <span>Заметки</span>
        </a>
        <div className={styles.divider} />
      </div>
    </section>
  );
};
