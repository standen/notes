import { useState } from "react";

import { NO_DATA } from "@/constants";

import { Content, Title } from "@/views/ViewMain/components";

import { useRoles } from "@/pages/PageSettings/components/AdminRoles/hooks";

import { Flex, Input, Button, List, Tooltip, Popconfirm } from "antd";
import {
  CloseOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

const { Search } = Input;

export const AdminRoles = () => {
  const { delRole, editRole, roles } = useRoles();

  const [searchString, setSearchString] = useState<string>("");

  return (
    <>
      <Title
        left={
          <Button color="blue" variant="solid" onClick={() => editRole()}>
            Добавить роль
          </Button>
        }
        right={
          <Flex>
            <Search
              placeholder="Поиск по роли"
              allowClear
              onChange={(e) => setSearchString(e.target.value)}
            />
          </Flex>
        }
      />
      <Content>
        <List
          size="small"
          dataSource={roles.filter((item) =>
            item?.name?.includes(searchString)
          )}
          renderItem={(item) => (
            <List.Item key={item?.id}>
              <Flex gap={8}>
                {item?.name}
                <Tooltip title={item?.allowed_actions?.join(", ")}>
                  <QuestionCircleOutlined />
                </Tooltip>
              </Flex>
              <Flex gap={8}>
                <EditOutlined
                  style={{ cursor: "pointer" }}
                  onClick={() => editRole(item?.id)}
                />
                <Popconfirm
                  title={`Удалить роль '${item?.name}'`}
                  description="Это действие необратимо"
                  onConfirm={() => delRole(item?.id)}
                  okText="Удалить"
                  cancelText="Нет"
                  okType="danger"
                >
                  <CloseOutlined style={{ cursor: "pointer", color: "#f00" }} />
                </Popconfirm>
              </Flex>
            </List.Item>
          )}
          locale={{ emptyText: NO_DATA.roles }}
        />
      </Content>
    </>
  );
};
