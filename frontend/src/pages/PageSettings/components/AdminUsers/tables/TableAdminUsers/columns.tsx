import { Flex, Popconfirm, Tag, type TableColumnsType } from "antd";

import { type IUser } from "@/api/generated_types";

export const columnsTableRolesList = (
  edit: (roleId: string) => void,
  del: (roleId: string) => void,
): TableColumnsType<IUser> => {
  return [
    {
      key: "login",
      dataIndex: "login",
      title: "Имя пользователя",
    },
    {
      key: "role",
      dataIndex: "role",
      title: "Роль",
      render: (_, { role }) => role?.name,
    },
    {
      key: "actions",
      dataIndex: "actions",
      title: "Действия",
      render: (_, { id, login }) => {
        return (
          <Flex gap={8}>
            <Tag
              style={{ cursor: "pointer" }}
              onClick={() => edit(id)}
              color="purple"
              variant="outlined"
            >
              Редактировать
            </Tag>
            <Popconfirm
              title={`Удалить пользователя '${login}'`}
              description="Это действие необратимо"
              onConfirm={() => del(id)}
              okText="Удалить"
              cancelText="Нет"
              okType="danger"
            >
              <Tag color="red" variant="outlined" style={{ cursor: "pointer" }}>
                Удалить
              </Tag>
            </Popconfirm>
          </Flex>
        );
      },
    },
  ];
};
