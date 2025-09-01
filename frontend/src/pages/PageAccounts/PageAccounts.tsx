import { Content, Title } from "@/views/ViewMain/components";
import { Button, Flex, Input } from "antd";

const { Search } = Input;

export const PageAccounts = () => {
  return (
    <>
      <Title
        left={
          <Button color="blue" variant="solid">
            Добавить аккаунт
          </Button>
        }
        right={
          <Flex>
            <Search placeholder="Поиск по логину" allowClear />
          </Flex>
        }
      />
      <Content>В разработке</Content>
    </>
  );
};
