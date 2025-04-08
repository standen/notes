import { FC } from "react";
import classNames from "classnames/bind";

import styles from "./styles.module.scss";
const cx = classNames.bind(styles);

export const Navbar: FC = () => {
  return (
    <section className={cx(["navbar"])}>
      <div className={cx(["navbar-menu"])}>
        <a href="">
          <i className="fa-solid fa-user"></i>
          <span>Аккаунты</span>
        </a>
        <a href="" className={cx(["menu-item-active"])}>
          <i className="fa-solid fa-file-pen"></i>
          <span>Заметки</span>
        </a>
        <div className={cx(["navbar-divider"])} />
        <a href="">
          <i className="fa-solid fa-gear"></i>
          <span>Настройки</span>
        </a>
      </div>
    </section>
  );
};
