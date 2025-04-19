import { FC, PropsWithChildren } from "react";
import classNames from "classnames/bind";

import styles from "./styles.module.scss";
const cx = classNames.bind(styles);

export const Card: FC<PropsWithChildren> = ({ children }) => {
  return <div className={cx(["card"])}>{children}</div>;
};
