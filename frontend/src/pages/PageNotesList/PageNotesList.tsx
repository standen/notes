import { useState } from "react";
import { useNavigate } from "react-router";

import { type INoteForTable } from "@/api/generated_types";

import { NO_DATA } from "@/constants";

import { useNotesList } from "@/pages/PageNotesList/hooks";

import { columnsTableNotesList } from "@/pages/PageNotesList/tables";
import { Content, Title } from "@/views/ViewMain/components";

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
            onClick={() =>
              navigate("/note/new/edit", { state: { link: "new" } })
            }
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
