import { Outlet } from "react-router";

import { HeaderMenu } from "@/components";
import { Layout, Flex, Tag } from "antd";

const { Header } = Layout;

export const ViewMain = () => {
  return (
    <Layout>
      <Header>
        <Flex align="center" gap={8} justify="space-between">
          <HeaderMenu />
          <div>
            <Tag color="error" bordered={false}>
              Ключ
            </Tag>
            <Tag color="blue" bordered={false}>
              Авторизоваться
            </Tag>
          </div>
        </Flex>
      </Header>
      <Outlet />
    </Layout>
  );
};
