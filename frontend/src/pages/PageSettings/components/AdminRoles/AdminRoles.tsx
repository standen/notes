import { Content, Title } from "@/views/ViewMain/components";

import { useRoleEdit } from "@/pages/PageSettings/components/AdminRoles/hooks";

import { Flex, Input, Button } from "antd";
const { Search } = Input;

export const AdminRoles = () => {
  const { editRole } = useRoleEdit();

  return (
    <>
      <Title
        left={
          <Button color="blue" variant="solid" onClick={() => editRole()}>
            Добавить роль
          </Button>
        }
        right={
          <Flex>
            <Search placeholder="Поиск по роли" allowClear />
          </Flex>
        }
      />
      <Content>AdminRoles</Content>
    </>
  );
};
