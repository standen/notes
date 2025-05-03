import { Tag, type TableProps } from "antd";

import { IUser } from "@/api";

export const ColumnsTableUsers = (): TableProps<IUser>["columns"] => {
  return [
    {
      title: "Логин",
      dataIndex: "login",
      key: "login",
    },
    {
      title: "Роль",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Действия",
      dataIndex: "actions",
      key: "actions",
      render: () => <Tag>123</Tag>,
    },
  ];
};
