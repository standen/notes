import { useUsersList, useUsersActions } from "@/hooks";

import { ColumnsTableUsers } from "./columns";

import { Button, Table, Card } from "antd";

export const SettingsUsers = () => {
  const { usersList, refreshUsers } = useUsersList();
  const { createUserModal } = useUsersActions();
  return (
    <Card
      variant="borderless"
      title={<>search</>}
      extra={
        <Button onClick={() => createUserModal(refreshUsers)}>
          Добавить пользователя
        </Button>
      }
    >
      <Table
        columns={ColumnsTableUsers(refreshUsers)}
        locale={{ emptyText: "Пользователи отсутствуют" }}
        dataSource={usersList}
        bordered
        pagination={false}
        size="small"
      />
    </Card>
  );
};
