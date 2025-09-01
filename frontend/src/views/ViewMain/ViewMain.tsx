import { Outlet } from "react-router";
import classNames from "classnames/bind";

import { HeaderMenu, UserKey, UserProfile } from "@/components";
import { Layout, Flex } from "antd";

import styles from "./styles.module.scss";
const cx = classNames.bind(styles);
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
      <div className={cx("content")}>
        <Outlet />
      </div>
    </Layout>
  );
};
