import { useState } from "react";
import { useNavigate } from "react-router";

import { SYSTEM } from "@/constants";

import { type INoteForTable } from "@/api/generated_types";

import { NO_DATA } from "@/constants";

import { useNotesList } from "@/pages/PageNotesList/hooks";

import { Content, Title } from "@/views/ViewMain/components";
import { columnsTableNotesList } from "@/pages/PageNotesList/tables";

import { Button, Flex, Input, Table } from "antd";

const { Search } = Input;

export const PageNotesList = () => {
  const { notes } = useNotesList();

  const navigate = useNavigate();

  const [searchString, setSearchString] = useState<string>("");

  return (
    <>
      <Title
        right={
          <Button
            color="blue"
            variant="solid"
            // TODO
            onClick={() => navigate(SYSTEM.menu.notes.url)}
          >
            Добавить заметку
          </Button>
        }
        left={
          <Flex>
            <Search
              placeholder="Поиск по заметке"
              allowClear
              onChange={(e) => setSearchString(e.target.value)}
            />
          </Flex>
        }
      />
      <Content>
        <Table<INoteForTable>
          bordered
          size="small"
          rowKey={(record) => record.id}
          locale={{ emptyText: NO_DATA.notes }}
          columns={columnsTableNotesList(
            () => {},
            () => {},
          )}
          dataSource={notes.filter((item) =>
            item?.name
              ?.toLocaleLowerCase()
              ?.includes(searchString?.toLocaleLowerCase()),
          )}
          pagination={false}
        />
      </Content>
    </>
  );
};
