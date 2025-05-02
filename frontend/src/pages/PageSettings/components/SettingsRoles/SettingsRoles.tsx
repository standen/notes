import { useRoles } from "@/hooks";

import { ColumnsTableRoles } from "./table/columns/ColumnsTableRoles";

import { Flex, Button, Table } from "antd";
import { Card } from "@/ui";

export const SettingsRoles = () => {
  const { rolesList, createRoleModal, refreshRoles } = useRoles();

  return (
    <Flex gap={10} vertical>
      <Card>
        <Flex justify="space-between">
          <div>search</div>
          <div>
            <Button onClick={() => createRoleModal(refreshRoles)}>
              Добавить
            </Button>
          </div>
        </Flex>
      </Card>
      <Card>
        <Table
          columns={ColumnsTableRoles(refreshRoles)}
          locale={{ emptyText: "Роли отсутствуют" }}
          dataSource={rolesList}
          bordered
          pagination={false}
          size="small"
        />
      </Card>
    </Flex>
  );
};
