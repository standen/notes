import { useState } from "react";

import { type IUser } from "@/api/generated_types";

import { NO_DATA } from "@/constants";

import { columnsTableRolesList } from "@/pages/PageSettings/components/AdminUsers/tables";
import { useUsers } from "@/pages/PageSettings/components/AdminUsers/hooks";

import { Content, Title } from "@/views/ViewMain/components";

import { Flex, Input, Button, Table } from "antd";

const { Search } = Input;

export const AdminUsers = () => {
  const { users, editUser, delUser, createUser } = useUsers();

  const [searchString, setSearchString] = useState<string>("");

  return (
    <>
      <Title
        right={
          <Button type="primary" onClick={() => createUser()}>
            Добавить пользователя
          </Button>
        }
        left={
          <Flex>
            <Search
              placeholder="Поиск по логину"
              allowClear
              onChange={(e) => setSearchString(e.target.value)}
            />
          </Flex>
        }
      />
      <Content>
        <Table<IUser>
          bordered
          size="small"
          rowKey={(record) => record.id}
          locale={{ emptyText: NO_DATA.roles }}
          columns={columnsTableRolesList(editUser, delUser)}
          dataSource={users.filter((item) =>
            item?.login
              ?.toLocaleLowerCase()
              ?.includes(searchString?.toLocaleLowerCase()),
          )}
          pagination={false}
        />
      </Content>
    </>
  );
};
