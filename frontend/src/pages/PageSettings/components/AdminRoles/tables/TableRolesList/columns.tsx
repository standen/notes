import { Tag, Flex, Popconfirm, type TableColumnsType } from "antd";

import { type IRole } from "@/api/settings";

export const columnsTableRolesList = (
  del: (roleId: string) => void,
  edit: (roleId: string) => void,
): TableColumnsType<IRole> => {
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
              <Tag key={item} color="blue" variant="filled">
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
              onClick={() => edit(id)}
              color="purple"
              variant="outlined"
            >
              Редактировать
            </Tag>
            <Popconfirm
              title={`Удалить роль '${name}'`}
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
