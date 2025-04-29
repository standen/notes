import { ModalRoleCreate } from "../../modals";

import { Tag, type TableProps } from "antd";
import { IRole } from "@/api";

export const columnsTableRoles = (): TableProps<IRole>["columns"] => {
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
    },
    {
      title: "Действия",
      dataIndex: "actions",
      key: "actions",
    },
  ];
};
