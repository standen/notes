import React, { FC, useState } from "react";
import { useNavigate } from "react-router";
import classNames from "classnames/bind";

import { ENavbarPages, MenuItems } from "@/router";
import { NavbarKey } from "./components";

import styles from "./styles.module.scss";
const cx = classNames.bind(styles);

export const Navbar: FC = () => {
  const [currentPage, setCurrentPage] =
    useState<keyof typeof ENavbarPages>("PageAccounts");

  const navigate = useNavigate();

  const Menu = () => {
    const result: React.ReactNode[] = [];

    for (const key of Object.keys(MenuItems)) {
      if (MenuItems[key as keyof typeof ENavbarPages].icon) {
        result.push(
          <a
            key={key as keyof typeof ENavbarPages}
            onClick={(e) => {
              e.preventDefault();
              navigate(MenuItems[key as keyof typeof ENavbarPages].link);
              setCurrentPage(key as keyof typeof ENavbarPages);
            }}
            className={cx({
              "menu-item-active":
                currentPage === (key as keyof typeof ENavbarPages),
            })}
          >
            {MenuItems[key as keyof typeof ENavbarPages].icon}
            <span>{MenuItems[key as keyof typeof ENavbarPages].title}</span>
          </a>
        );
      }
    }

    // добавляем divider
    result.splice(
      -1,
      0,
      <div className={cx("navbar-divider")} key="navbar-divider" />
    );

    return result;
  };

  return (
    <section className={cx("navbar")}>
      {/* top of navbar */}
      <div>
        <NavbarKey />
        <div className={cx("navbar-menu")}>
          <Menu />
        </div>
      </div>
      {/* bottom of navbar */}
      <div />
    </section>
  );
};
