import React, { FC, useEffect, useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router";
import classNames from "classnames/bind";

import { ENavbarPages, MenuItems } from "@/router";
import { NavbarKey } from "./components";

import styles from "./styles.module.scss";
const cx = classNames.bind(styles);

export const Navbar: FC = () => {
  const [currentPage, setCurrentPage] =
    useState<keyof typeof ENavbarPages>("PageAccounts");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setCurrentPage("PageAccounts");
    } else if (location.pathname.includes(MenuItems.PageNotes.link)) {
      setCurrentPage("PageNotes");
    } else if (location.pathname.includes(MenuItems.PageBirthdays.link)) {
      setCurrentPage("PageBirthdays");
    } else if (location.pathname.includes(MenuItems.PageSettings.link)) {
      setCurrentPage("PageSettings");
    } else if (location.pathname.includes(MenuItems.PagePayments.link)) {
      setCurrentPage("PagePayments");
    }
  }, [location]);

  const Menu = useMemo(() => {
    const result: React.ReactNode[] = [];

    for (const key of Object.keys(MenuItems)) {
      if (MenuItems[key as keyof typeof ENavbarPages].icon) {
        result.push(
          <a
            key={key as keyof typeof ENavbarPages}
            onClick={(e) => {
              e.preventDefault();
              navigate(MenuItems[key as keyof typeof ENavbarPages].link);
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
  }, [currentPage, navigate]);

  return (
    <section className={cx("navbar")}>
      {/* top of navbar */}
      <div>
        <NavbarKey />
        <div className={cx("navbar-menu")}>{Menu}</div>
      </div>
      {/* bottom of navbar */}
      <div />
    </section>
  );
};
