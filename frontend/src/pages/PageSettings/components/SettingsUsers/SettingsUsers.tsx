import { useUsers } from "@/hooks";

import { ColumnsTableUsers } from "./columns";

import { Flex, Button, Table } from "antd";
import { Card } from "@/ui";

export const SettingsUsers = () => {
  const { usersList } = useUsers();
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
          columns={ColumnsTableUsers()}
          locale={{ emptyText: "Пользователи отсутствуют" }}
          dataSource={usersList}
          bordered
          pagination={false}
          size="small"
        />
      </Card>
    </Flex>
  );
};
