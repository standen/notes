import classNames from "classnames/bind";

import type { FC, PropsWithChildren } from "react";

import styles from "./styles.module.scss";
const cx = classNames.bind(styles);

export const Content: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={cx("content")}>
      <div className={cx("content-body")}>{children}</div>
    </div>
  );
};
