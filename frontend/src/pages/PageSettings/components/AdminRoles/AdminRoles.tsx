import { useState } from "react";

import { Content, Title } from "@/views/ViewMain/components";

import { useRoles } from "@/pages/PageSettings/components/AdminRoles/hooks";
import { TableRolesList } from "@/pages/PageSettings/components/AdminRoles/tables";

import { Flex, Input, Button } from "antd";

const { Search } = Input;

export const AdminRoles = () => {
  const { editRole, roles } = useRoles();

  const [searchString, setSearchString] = useState<string>("");

  return (
    <>
      <Title
        right={
          <Button type="primary" onClick={() => editRole()}>
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
        <TableRolesList
          roles={roles.filter((item) =>
            item?.name
              ?.toLocaleLowerCase()
              ?.includes(searchString?.toLocaleLowerCase()),
          )}
        />
      </Content>
    </>
  );
};
