import { FC } from "react";
import classNames from "classnames/bind";

import styles from "./styles.module.scss";
const cx = classNames.bind(styles);

export const Header: FC = () => {
  return (
    <>
      <div className={cx(["header-logo"])}>notes</div>
      <div className={cx(["header-content"])}>456</div>
    </>
  );
};
