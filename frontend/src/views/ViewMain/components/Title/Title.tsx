import type { ReactElement, FC } from "react";
import classNames from "classnames/bind";

import { Flex } from "antd";

import styles from "./styles.module.scss";
const cx = classNames.bind(styles);

interface Props {
  title: string;
  left: ReactElement;
  right: ReactElement;
}

export const Title: FC<Props> = ({ title, left, right }) => (
  <div className={cx("title")}>
    <Flex gap={12}>
      <div>{title}</div>
      <div>{left}</div>
    </Flex>
    {right}
  </div>
);
