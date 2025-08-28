import { Content, Title } from "@/views/ViewMain/components";
import { Button, Flex, Input } from "antd";

const { Search } = Input;

export const PageNotes = () => {
  return (
    <div>
      <Title
        left={
          <Button color="blue" variant="solid">
            Добавить заметку
          </Button>
        }
        right={
          <Flex>
            <Search placeholder="Поиск по заметке" allowClear />
          </Flex>
        }
      />
      <Content>123</Content>
    </div>
  );
};
