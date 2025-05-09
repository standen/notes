import { useRolesList, useRolesActions } from "@/hooks";

import { ColumnsTableRoles } from "./columns";

import { Button, Table, Card } from "antd";

export const SettingsRoles = () => {
  const { rolesList, refreshRoles } = useRolesList();
  const { createRoleModal } = useRolesActions();
  return (
    <Card
      variant="borderless"
      title={<>search</>}
      extra={
        <Button onClick={() => createRoleModal(refreshRoles)}>
          Добавить роль
        </Button>
      }
    >
      <Table
        columns={ColumnsTableRoles(refreshRoles)}
        locale={{ emptyText: "Роли отсутствуют" }}
        dataSource={rolesList}
        bordered
        pagination={false}
        size="small"
      />
    </Card>
  );
};
