import { FC } from "react";

import styles from "./styles.module.scss";

export const Header: FC = () => {
  return (
    <section className={styles.header}>
      <div className={styles.header_content}>
        <div>
            <span className={styles.logo}>notes</span>
        </div>
        <div>
          <i className="fa-solid fa-gear"></i>
        </div>
      </div>
    </section>
  );
};
