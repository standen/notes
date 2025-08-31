import { useState } from "react";

import { NO_DATA } from "@/constants";

import { useUsers } from "@/pages/PageSettings/components/AdminUsers/hooks";

import { Content, Title } from "@/views/ViewMain/components";

import { Flex, Input, Button, List, Tag, Popconfirm } from "antd";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";

const { Search } = Input;

export const AdminUsers = () => {
  const { users, editUser, delUser } = useUsers();

  const [searchString, setSearchString] = useState<string>("");

  return (
    <>
      <Title
        left={
          <Button type="primary" onClick={() => editUser()}>
            Добавить пользователя
          </Button>
        }
        right={
          <Flex>
            <Search
              placeholder="Поиск по логину"
              allowClear
              onChange={(e) => setSearchString(e.target.value)}
            />
          </Flex>
        }
      />
      <Content>
        <List
          size="small"
          dataSource={users?.filter((item) =>
            item?.login?.includes(searchString)
          )}
          renderItem={(item) => (
            <List.Item key={""}>
              <Flex gap={8}>
                <Tag>{item?.role?.name}</Tag>
                <div>{item?.login}</div>
              </Flex>
              <Flex gap={8}>
                <EditOutlined
                  style={{ cursor: "pointer" }}
                  onClick={() => editUser(item?.id)}
                />
                <Popconfirm
                  title={`Удалить пользователя '${item?.login}'`}
                  description="Это действие необратимо"
                  onConfirm={() => delUser(item?.id)}
                  okText="Удалить"
                  cancelText="Нет"
                  okType="danger"
                >
                  <CloseOutlined style={{ cursor: "pointer", color: "#f00" }} />
                </Popconfirm>
              </Flex>
            </List.Item>
          )}
          locale={{ emptyText: NO_DATA.users }}
        />
      </Content>
    </>
  );
};
