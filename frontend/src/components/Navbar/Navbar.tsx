import { FC, useState } from "react";
import { useNavigate } from "react-router";
import classNames from "classnames/bind";

import { ELinks } from "@/router";

import styles from "./styles.module.scss";
const cx = classNames.bind(styles);

export const Navbar: FC = () => {
  const [menu, setMenu] = useState<ELinks>(ELinks.accounts);

  let navigate = useNavigate();

  return (
    <section className={cx(["navbar"])}>
      <div className={cx(["navbar-menu"])}>
        <a
          onClick={(e) => {
            e.preventDefault();
            navigate(ELinks.accounts);
            setMenu(ELinks.accounts);
          }}
          className={cx([menu === ELinks.accounts && "menu-item-active"])}
        >
          <i className="fa-solid fa-user" />
          <span>Аккаунты</span>
        </a>
        <a
          onClick={(e) => {
            e.preventDefault();
            navigate(ELinks.notes);
            setMenu(ELinks.notes);
          }}
          className={cx([menu === ELinks.notes && "menu-item-active"])}
        >
          <i className="fa-solid fa-file-pen" />
          <span>Заметки</span>
        </a>
        <a
          onClick={(e) => {
            e.preventDefault();
            navigate(ELinks.birthdays);
            setMenu(ELinks.birthdays);
          }}
          className={cx([menu === ELinks.birthdays && "menu-item-active"])}
        >
          <i className="fa-solid fa-cake-candles" />
          <span>Дни рождения</span>
        </a>
        <div className={cx(["navbar-divider"])} />
        <a
          onClick={(e) => {
            e.preventDefault();
            navigate(ELinks.settings);
            setMenu(ELinks.settings);
          }}
          className={cx([menu === ELinks.settings && "menu-item-active"])}
        >
          <i className="fa-solid fa-gear" />
          <span>Настройки</span>
        </a>
      </div>
    </section>
  );
};
