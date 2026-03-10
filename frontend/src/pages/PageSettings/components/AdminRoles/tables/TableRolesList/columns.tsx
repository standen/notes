import { Tag, Flex, Popconfirm, type TableColumnsType } from "antd";

import { useRoles } from "@/pages/PageSettings/components/AdminRoles/hooks";

import { type IRole } from "@/api/settings";

export const columnsTableRolesList = (): TableColumnsType<IRole> => {
  const { delRole, editRole } = useRoles();

  return [
    {
      key: "name",
      dataIndex: "name",
      title: "Имя роли",
    },
    {
      key: "allowed_actions",
      dataIndex: "allowed_actions",
      title: "Права",
      render: (_, { allowed_actions }) => {
        return (
          <Flex gap="small" wrap>
            {allowed_actions.map((item) => (
              <Tag key={item} color="blue" variant="outlined">
                {item}
              </Tag>
            ))}
          </Flex>
        );
      },
    },
    {
      key: "actions",
      dataIndex: "actions",
      title: "Действия",
      render: (_, { id, name }) => {
        return (
          <Flex gap={8}>
            <Tag
              style={{ cursor: "pointer" }}
              onClick={() => editRole(id)}
              color="purple"
              variant="outlined"
            >
              Редактировать
            </Tag>
            <Popconfirm
              title={`Удалить роль '${name}'`}
              description="Это действие необратимо"
              onConfirm={() => delRole(id)}
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
