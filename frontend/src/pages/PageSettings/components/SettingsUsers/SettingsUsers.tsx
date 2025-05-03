import { Flex, Button, Table } from "antd";
import { Card } from "@/ui";

export const SettingsUsers = () => {
  return (
    <Flex gap={10} vertical>
      <Card>
        <Flex justify="space-between">
          <div>search</div>
          <div>
            <Button>Добавить пользователя</Button>
          </div>
        </Flex>
      </Card>
      <Card>
        <Table
          // columns={ColumnsTableRoles(refreshRoles)}
          locale={{ emptyText: "Пользователи отсутствуют" }}
          // dataSource={rolesList}
          bordered
          pagination={false}
          size="small"
        />
      </Card>
    </Flex>
  );
};
