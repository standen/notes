import { useState } from "react";

import { type IRole } from "@/api/generated_types";

import { NO_DATA } from "@/constants";

import { columnsTableRolesList } from "@/pages/PageSettings/components/AdminRoles/tables";
import { Content, Title } from "@/views/ViewMain/components";

import { useRoles } from "@/pages/PageSettings/components/AdminRoles/hooks";

import { Flex, Input, Button, Table } from "antd";

const { Search } = Input;

export const AdminRoles = () => {
  const { editRole, delRole, roles, createRole } = useRoles();

  const [searchString, setSearchString] = useState<string>("");

  return (
    <>
      <Title
        right={
          <Button type="primary" onClick={() => createRole()}>
            Добавить роль
          </Button>
        }
        left={
          <Flex>
            <Search
              placeholder="Поиск по роли"
              allowClear
              onChange={(e) => setSearchString(e.target.value)}
            />
          </Flex>
        }
      />
      <Content>
        <Table<IRole>
          bordered
          size="small"
          rowKey={(record) => record.id}
          locale={{ emptyText: NO_DATA.roles }}
          columns={columnsTableRolesList(delRole, editRole)}
          dataSource={roles.filter((item) =>
            item?.name
              ?.toLocaleLowerCase()
              ?.includes(searchString?.toLocaleLowerCase()),
          )}
          pagination={false}
        />
      </Content>
    </>
  );
};
