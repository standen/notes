import { useAuth } from "@/hooks";

import { Tag } from "antd";

export const UserProfile = () => {
  const { auth } = useAuth();

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
};
