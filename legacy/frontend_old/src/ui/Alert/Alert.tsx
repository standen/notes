import { FC } from "react";
import classNames from "classnames/bind";

import { TAlert } from "./types";
import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

export const Alert: FC<TAlert> = (props) => {
  const { type, text } = props;
  return <div className={cx("alert", `alert-${type}`)}>{text}</div>;
};
