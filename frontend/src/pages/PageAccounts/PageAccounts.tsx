import { Content, Title } from "@/views/ViewMain/components";
import { Button, Flex, Input } from "antd";

const { Search } = Input;

export const PageAccounts = () => {
  return (
    <>
      <Title
        right={
          <Button color="blue" variant="solid">
            Добавить аккаунт
          </Button>
        }
        left={
          <Flex>
            <Search placeholder="Поиск по логину" allowClear />
          </Flex>
        }
      />
      <Content>В разработке</Content>
    </>
  );
};
