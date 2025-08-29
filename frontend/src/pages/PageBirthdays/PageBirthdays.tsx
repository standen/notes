import { Loader } from "@/components";
import { Content, Title } from "@/views/ViewMain/components";
import { Button, Flex, Input } from "antd";

const { Search } = Input;

export const PageBirthdays = () => {
  return (
    <Loader>
      <Title
        left={
          <Button color="blue" variant="solid">
            Добавить событие
          </Button>
        }
        right={
          <Flex>
            <Search placeholder="Поиск по ФИО" allowClear />
          </Flex>
        }
      />
      <Content>123</Content>
    </Loader>
  );
};
