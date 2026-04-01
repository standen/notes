import { Flex, Popconfirm, Tag, type TableColumnsType } from "antd";

import { type INoteForTable } from "@/api/generated_types";

export const columnsTableNotesList = (
  edit: (noteId: string) => void,
  del: (noteId: string) => void,
): TableColumnsType<INoteForTable> => {
  return [
    {
      key: "name",
      dataIndex: "name",
      title: "Наименование заметки",
    },
    {
      key: "link",
      dataIndex: "link",
      title: "Ссылка",
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
              title={`Удалить заметку '${name}'`}
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
