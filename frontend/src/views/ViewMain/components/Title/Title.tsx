import React, { type ReactElement, type FC } from "react";
import classNames from "classnames/bind";

import styles from "./styles.module.scss";
const cx = classNames.bind(styles);

interface Props {
  left: ReactElement;
  right: ReactElement;
}

export const Title: FC<Props> = ({ left, right }) => (
  <div className={cx("title")}>
    {left}
    {right}
  </div>
);
