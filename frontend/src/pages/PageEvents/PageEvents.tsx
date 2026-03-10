import { Content, Title } from "@/views/ViewMain/components";
import { Button, Flex, Input } from "antd";

const { Search } = Input;

export const PageEvents = () => {
  return (
    <>
      <Title
        right={
          <Button color="blue" variant="solid">
            Добавить событие
          </Button>
        }
        left={
          <Flex>
            <Search placeholder="Поиск события" allowClear />
          </Flex>
        }
      />
      <Content>В разработке</Content>
    </>
  );
};
