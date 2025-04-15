import React, { FC, useState } from "react";
import { useNavigate } from "react-router";
import classNames from "classnames/bind";

import { ENavbarPages, MenuItems } from "@/router";

import styles from "./styles.module.scss";
const cx = classNames.bind(styles);

export const Navbar: FC = () => {
  const [currentPage, setCurrentPage] =
    useState<keyof typeof ENavbarPages>("PageAccounts");

  let navigate = useNavigate();

  const Menu = () => {
    const result: React.ReactNode[] = [];

    for (const key of Object.keys(MenuItems)) {
      if (MenuItems[key as keyof typeof ENavbarPages].icon) {
        result.push(
          <a
            onClick={(e) => {
              e.preventDefault();
              navigate(MenuItems[key as keyof typeof ENavbarPages].link);
              setCurrentPage(key as keyof typeof ENavbarPages);
            }}
            className={cx([
              currentPage === (key as keyof typeof ENavbarPages) &&
                "menu-item-active",
            ])}
          >
            {MenuItems[key as keyof typeof ENavbarPages].icon}
            <span>{MenuItems[key as keyof typeof ENavbarPages].title}</span>
          </a>
        );
      }
    }

    // добавляем divider
    result.splice(-1, 0, <div className={cx(["navbar-divider"])} />);

    return result;
  };

  return (
    <section className={cx(["navbar"])}>
      <div className={cx(["navbar-menu"])}>
        <Menu />
      </div>
    </section>
  );
};
