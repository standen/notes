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
            <Tag color="#f50">Ключ</Tag>
            <Tag color="#1677ff">Авторизоваться</Tag>
          </div>
        </Flex>
      </Header>
      <Outlet />
    </Layout>
  );
};
