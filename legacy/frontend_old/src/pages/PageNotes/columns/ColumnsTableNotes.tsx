import { type TableProps } from "antd";
import { INote, endpoints } from "@/api";

import { useNavigate, Link } from "react-router";

export const ColumnsTableNotes = (): TableProps<INote>["columns"] => {
  return [
    {
      title: "Наименование",
      dataIndex: "name",
      key: "name",
      render: (value, record) => (
        <Link to={endpoints.notes.edit(record.link)}>{value}</Link>
      ),
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
