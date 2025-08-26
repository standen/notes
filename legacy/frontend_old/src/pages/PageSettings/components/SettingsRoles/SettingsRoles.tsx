import { useRolesList, useRolesActions } from "@/hooks";
import { useRoles } from "@/pages/PageSettings/components/SettingsRoles/hooks";

import { ColumnsTableRoles } from "./columns";

import { Button, Table, Card } from "antd";

export const SettingsRoles = () => {
  const { refreshRoles } = useRolesList();
  const { createRoleModal } = useRolesActions();
  const { roles } = useRoles();
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
        dataSource={roles}
        bordered
        pagination={false}
        size="small"
      />
    </Card>
  );
};
