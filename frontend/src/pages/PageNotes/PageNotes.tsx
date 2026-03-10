import { useState } from "react";
import { useNavigate } from "react-router";

import { NavMenu } from "@/router/constants";
import { NO_DATA } from "@/constants";

import { useNotes } from "@/pages/PageNotes/hooks";

import { Content, Title } from "@/views/ViewMain/components";

import { Button, Flex, Input, List, Popconfirm, Tag } from "antd";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";

const { Search } = Input;

export const PageNotes = () => {
  const { notes } = useNotes();

  const navigate = useNavigate();

  const [searchString, setSearchString] = useState<string>("");

  return (
    <>
      <Title
        right={
          <Button color="blue" variant="solid">
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
        <List
          size="small"
          dataSource={notes?.filter((item) =>
            item?.name
              ?.toLocaleLowerCase()
              ?.includes(searchString?.toLocaleLowerCase()),
          )}
          renderItem={(item) => (
            <List.Item key={item?.id}>
              <Flex gap={8}>
                <Tag>{item?.link}</Tag>
                <div>{item?.name}</div>
              </Flex>
              <Flex gap={8}>
                <EditOutlined
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    navigate(NavMenu.PageNoteEngine.url, {
                      state: { noteLink: item?.link },
                    })
                  }
                />
                <Popconfirm
                  title={`Удалить заметку '${item?.link}'`}
                  description="Это действие необратимо"
                  onConfirm={() => {}}
                  okText="Удалить"
                  cancelText="Нет"
                  okType="danger"
                >
                  <CloseOutlined style={{ cursor: "pointer", color: "#f00" }} />
                </Popconfirm>
              </Flex>
            </List.Item>
          )}
          locale={{ emptyText: NO_DATA.notes }}
        />
      </Content>
    </>
  );
};
