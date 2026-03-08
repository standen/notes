import { useMemo } from "react";
import classNames from "classnames/bind";

import { storeUserInfo } from "@/store";
import { useAuth } from "@/hooks";

import { Tag, Popconfirm } from "antd";

import styles from "./styles.module.scss";
const cx = classNames.bind(styles);

export const UserProfile = () => {
  const { auth, logout } = useAuth();
  const { user } = storeUserInfo();

  const content = useMemo(() => {
    if (!user?.login) {
      return (
        <Tag
          color="blue"
          variant="filled"
          className={cx(["tagToLink"])}
          onClick={auth}
        >
          Авторизоваться
        </Tag>
      );
    }

    return (
      <Popconfirm
        title="Выйти из профиля"
        description="Это действие необратимо"
        onConfirm={logout}
        okText="Выйти"
        cancelText="Нет"
      >
        <Tag
          color="blue-inverse"
          variant="filled"
          className={cx(["tagToLink"])}
        >
          {user?.login}
        </Tag>
      </Popconfirm>
    );
  }, [user, auth, logout]);

  return <>{content}</>;
};
