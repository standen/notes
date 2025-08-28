import { Outlet } from "react-router";

import { HeaderMenu, UserKey, UserProfile } from "@/components";
import { Layout, Flex } from "antd";

const { Header } = Layout;

export const ViewMain = () => {
  return (
    <Layout>
      <Header>
        <Flex align="center" gap={8} justify="space-between">
          <HeaderMenu />
          <div>
            <UserKey />
            <UserProfile />
          </div>
        </Flex>
      </Header>
      <Outlet />
    </Layout>
  );
};
