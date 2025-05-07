import { type TableProps } from "antd";
import { INote } from "@/api";

export const ColumnsTableNotes = (): TableProps<INote>["columns"] => {
  return [
    {
      title: "Наименование",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ссылка",
      dataIndex: "link",
      key: "link",
    },
    {
      title: "Автор",
      dataIndex: "author",
      key: "author",
      render: (_, record) => record?.author?.login || "Н/Д",
    },
  ];
};
