import { FC } from "react";
import { Outlet } from "react-router";

import { Header, Navbar } from "@/components";

import styles from "./styles.module.scss";

export const PageTemplate: FC = () => {
  return (
    <section className={styles.grid}>
      <Header />
      <Navbar />
    </section>
  );
};
