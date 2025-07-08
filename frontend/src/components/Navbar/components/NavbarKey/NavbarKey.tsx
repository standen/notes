import { FC } from "react";
import classNames from "classnames/bind";

import styles from "./styles.module.scss";
import axios from "axios";
const cx = classNames.bind(styles);

export const NavbarKey: FC = () => {
  return (
    <div className={cx("navbar-key")}>
      <div
        className={cx("navbar-key-button")}
        onClick={() => {
          axios
            .delete("http://localhost:3000/birthdays/")
            .then((res) => console.log(res.status))
            .catch((e) => console.log(e.response.status));
        }}
      >
        Ключ
      </div>
    </div>
  );
};
