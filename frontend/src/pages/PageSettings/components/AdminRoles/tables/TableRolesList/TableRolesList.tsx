import { type FC } from "react";

import { Table } from "antd";

import { NO_DATA } from "@/constants";

import { type IRole } from "@/api/settings";
import { columnsTableRolesList } from "./columns";

interface Props {
  roles: IRole[];
}

export const TableRolesList: FC<Props> = ({ roles }) => {
  return (
    <Table<IRole>
      bordered
      size="small"
      locale={{ emptyText: NO_DATA.roles }}
      columns={columnsTableRolesList()}
      dataSource={roles}
      pagination={false}
    />
  );
};
