import { FC } from "react";

import { useNotes } from "@/hooks";
import { Content } from "@/components";
import { ColumnsTableNotes } from "./columns";

import { Button, Table, Card } from "antd";

export const PageNotes: FC = () => {
  const { notesList } = useNotes();
  return (
    <Content title="Заметки">
      <Card
        variant="borderless"
        title={<>search</>}
        extra={<Button>Добавить заметку</Button>}
      >
        <Table
          columns={ColumnsTableNotes()}
          locale={{ emptyText: "Заметки отсутствуют" }}
          dataSource={notesList}
          bordered
          pagination={false}
          size="small"
        />
      </Card>
    </Content>
  );
};
