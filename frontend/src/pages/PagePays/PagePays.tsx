import { Content, Title } from "@/views/ViewMain/components";
import { Button, Flex, Input } from "antd";

const { Search } = Input;

export const PagePays = () => {
  return (
    <>
      <Title
        right={
          <Button color="blue" variant="solid">
            Добавить платеж
          </Button>
        }
        left={
          <Flex>
            <Search placeholder="Поиск платежа" allowClear />
          </Flex>
        }
      />
      <Content>В разработке</Content>
    </>
  );
};
