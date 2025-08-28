import { Content, Title } from "@/views/ViewMain/components";

import { Flex, Input, Button } from "antd";
const { Search } = Input;

export const AdminRoles = () => {
  return (
    <>
      <Title
        left={
          <Button color="blue" variant="solid">
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
