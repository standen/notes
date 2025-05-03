import { useRoles } from "@/hooks";
import { IRole } from "@/api";

import { type TableProps, Button, Flex, Popconfirm } from "antd";

export const ColumnsTableRoles = (
  refreshRoles: () => void
): TableProps<IRole>["columns"] => {
  const { editRoleModal, deleteRoleAction } = useRoles();

  return [
    {
      title: "Наименование",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Разрешения",
      dataIndex: "allowed_actions",
      key: "allowed_actions",
      render: (value) => {
        return value.join(" ");
      },
    },
    {
      title: "Действия",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => {
        return (
          <Flex gap={10}>
            <Button
              size="small"
              onClick={() =>
                editRoleModal(
                  {
                    id: record.id,
                    allowed_actions: record.allowed_actions,
                    name: record.name,
                  },
                  () => refreshRoles()
                )
              }
            >
              Редактировать
            </Button>
            <Popconfirm
              title="Удаление роли"
              description="Действительно хотите удалить роль?"
              okText="Удалить"
              cancelText="Отмена"
              onConfirm={() =>
                deleteRoleAction(record.id, () => refreshRoles())
              }
            >
              <Button size="small" danger>
                Удалить
              </Button>
            </Popconfirm>
          </Flex>
        );
      },
    },
  ];
};
