import { Tag } from "antd";
import classNames from "classnames/bind";

import styles from "./styles.module.scss";
const cx = classNames.bind(styles);

export const UserKey = () => {
  return (
    <Tag variant="filled" color="red" className={cx(["tagToLink"])}>
      Ключ
    </Tag>
  );
};
