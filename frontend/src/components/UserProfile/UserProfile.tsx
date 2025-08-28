import { useMemo } from "react";

import { storeUserInfo } from "@/store";
import { useAuth } from "@/hooks";

import { Tag, Popconfirm } from "antd";

export const UserProfile = () => {
  const { auth, logout } = useAuth();
  const { user } = storeUserInfo();

  const content = useMemo(() => {
    if (!user?.login) {
      return (
        <Tag
          color="blue"
          bordered={false}
          style={{ cursor: "pointer" }}
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
          bordered={false}
          style={{ cursor: "pointer" }}
        >
          {user?.login}
        </Tag>
      </Popconfirm>
    );
  }, [user, auth, logout]);

  return <>{content}</>;
};
