import { useState, useEffect } from "react";
import axios from "axios";

import { Table } from "antd";
import { columnsTableRoles } from "./columns/columnsTableRoles";
import { endpoints, IRolesList, IRole } from "@/api";

export const TableRoles = () => {
  const [roles, setRoles] = useState<IRole[]>();

  const getRoles = async () => {
    await axios
      .get<IRolesList>(endpoints.roles.get)
      .then((res) => setRoles(res.data.result.roles));
  };

  useEffect(() => {
    getRoles();
  }, []);

  return (
    <Table
      columns={columnsTableRoles}
      locale={{ emptyText: "Роли отсутствуют" }}
      dataSource={roles}
      bordered
      pagination={false}
      size="small"
    />
  );
};
