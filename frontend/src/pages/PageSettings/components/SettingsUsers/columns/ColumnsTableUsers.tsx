import { useUsers } from "@/hooks";
import { type TableProps, Flex, Button, Popconfirm } from "antd";

import { IUser } from "@/api";

export const ColumnsTableUsers = (
  refreshUsers: () => void
): TableProps<IUser>["columns"] => {
  const { editUserModal, deleteUserAction } = useUsers();

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
      render: (_, record) => record.role.name,
    },
    {
      title: "Действия",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Flex gap={10}>
          <Button
            size="small"
            onClick={() =>
              editUserModal(
                {
                  login: record.login,
                  id: record.id,
                  role: { id: record.role.id, name: record.role.name },
                },
                () => refreshUsers()
              )
            }
          >
            Редактировать
          </Button>
          <Popconfirm
            title="Удаление пользователя"
            description="Действительно хотите удалить пользователя?"
            okText="Удалить"
            cancelText="Отмена"
            onConfirm={() => deleteUserAction(record.id, () => refreshUsers())}
          >
            <Button size="small" danger>
              Удалить
            </Button>
          </Popconfirm>
        </Flex>
      ),
    },
  ];
};
