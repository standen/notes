import { FC, PropsWithChildren } from "react";
import classNames from "classnames/bind";

import { TCard } from "./types";

import styles from "./styles.module.scss";
const cx = classNames.bind(styles);

export const Card: FC<PropsWithChildren<TCard>> = ({ classname, children }) => {
  return <div className={cx("card", classname)}>{children}</div>;
};
