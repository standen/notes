import { Tag } from "antd";
import classNames from "classnames/bind";

import { storeUserKey } from "@/store";
import { useUserKey } from "@/components/UserKey/hooks";

import styles from "./styles.module.scss";
const cx = classNames.bind(styles);

export const UserKey = () => {
  const { keySet } = useUserKey();
  const { key } = storeUserKey();

  return (
    <Tag
      variant="filled"
      color={key ? "green" : "red"}
      className={cx(["tagToLink"])}
      onClick={keySet}
    >
      Ключ
    </Tag>
  );
};
