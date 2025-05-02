import { useRoles } from "@/hooks";
import { IRole } from "@/api";

import { type TableProps, Button, Flex } from "antd";

export const ColumnsTableRoles = (): TableProps<IRole>["columns"] => {
  const { editRoleModal, refreshRoles } = useRoles();

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
                  record.id,
                  record.name,
                  record.allowed_actions,
                  () => refreshRoles()
                )
              }
            >
              Редактировать
            </Button>
            <Button size="small" danger>
              Удалить
            </Button>
          </Flex>
        );
      },
    },
  ];
};
