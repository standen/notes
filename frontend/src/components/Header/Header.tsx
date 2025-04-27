import { FC } from "react";
import classNames from "classnames/bind";

import styles from "./styles.module.scss";
const cx = classNames.bind(styles);

import axios from "axios";

export const Header: FC = () => {
  return (
    <>
      <div
        className={cx("header-logo")}
        onClick={() => {
          axios
            .post(
              "http://localhost:3000/settings/roles",
              {
                name: "Имя роли",
                allowed_actions: ["USER_ADD"],
              },
              { withCredentials: true }
            )
            .then((res) => console.log(res.data));
        }}
      >
        notes
      </div>
      <div className={cx("header-content")}>456</div>
    </>
  );
};
