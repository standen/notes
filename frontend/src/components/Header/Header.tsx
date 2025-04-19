import { FC } from "react";
import classNames from "classnames/bind";

import styles from "./styles.module.scss";
const cx = classNames.bind(styles);

import axios from "axios";

export const Header: FC = () => {
  return (
    <>
      <div
        className={cx(["header-logo"])}
        onClick={() => {
          axios
            .post(
              "http://localhost:80/auth/logout",
              {
                login: "admin",
                password:
                  "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3",
              },
              { withCredentials: true }
            )
            .then((res) => console.log(res.data));
        }}
      >
        notes
      </div>
      <div className={cx(["header-content"])}>456</div>
    </>
  );
};
