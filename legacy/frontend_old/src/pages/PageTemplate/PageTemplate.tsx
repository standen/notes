import { FC } from "react";
import { Outlet } from "react-router";
import classNames from "classnames/bind";

import { Header, Navbar } from "@/components";

import styles from "./styles.module.scss";
const cx = classNames.bind(styles);

export const PageTemplate: FC = () => {
  return (
    <section className={cx("grid")}>
      <Header />
      <Navbar />
      <Outlet />
    </section>
  );
};
