import { FC } from "react";
import classNames from "classnames/bind";

import styles from "./styles.module.scss";
const cx = classNames.bind(styles);

export const NavbarKey: FC = () => {
  return (
    <div className={cx(["navbar-key"])}>
      <div className={cx(["navbar-key-button"])}>Ключ</div>
    </div>
  );
};
