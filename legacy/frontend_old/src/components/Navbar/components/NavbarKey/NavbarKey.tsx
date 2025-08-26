import { FC } from "react";
import classNames from "classnames/bind";

import { userStore } from "@/store";

import styles from "./styles.module.scss";
const cx = classNames.bind(styles);

export const NavbarKey: FC = () => {
  const { rename } = userStore();

  return (
    <div className={cx("navbar-key")}>
      <div
        className={cx("navbar-key-button")}
        onClick={() => {
          rename("standen");
        }}
      >
        Ключ
      </div>
    </div>
  );
};
