import { FC } from "react";
import classNames from "classnames/bind";

import { Content } from "@/components";

import styles from "./styles.module.scss";
const cx = classNames.bind(styles);

export const PageSettings: FC = () => {
  return <Content title="Настройки"></Content>;
};
