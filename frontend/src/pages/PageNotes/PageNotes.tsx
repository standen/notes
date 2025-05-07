import { FC } from "react";

import { useNotes } from "@/hooks";
import { Content } from "@/components";
import { ColumnsTableNotes } from "./columns";

// import { Card } from "@/ui";
import { Flex, Button, Table, Card } from "antd";

export const PageNotes: FC = () => {
  const { notesList } = useNotes();
  return (
    <Content title="Заметки">
      <Flex vertical gap={10}>
        <Card>
          <Flex justify="space-between">
            <div>search</div>
            <div>
              <Button>Добавить заметку</Button>
            </div>
          </Flex>
        </Card>
        <Card variant="borderless">
          <Table
            columns={ColumnsTableNotes()}
            locale={{ emptyText: "Заметки отсутствуют" }}
            dataSource={notesList}
            bordered
            pagination={false}
            size="small"
          />
        </Card>
      </Flex>
    </Content>
  );
};
