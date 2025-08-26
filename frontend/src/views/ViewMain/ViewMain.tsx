import { Outlet } from "react-router";
import { Layout, Menu, Flex, Tag } from "antd";

const { Header, Footer } = Layout;

const items = Array.from({ length: 15 }).map((_, index) => ({
  key: index + 1,
  label: `nav ${index + 1}`,
}));

export const ViewMain = () => {
  return (
    <Layout>
      <Header>
        <Flex align="center" gap={8}>
          <Tag>Ключ</Tag>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={items}
            style={{ flex: 1, minWidth: 0 }}
            onSelect={({ key }) => console.log(key)}
          />
        </Flex>
      </Header>
      <div style={{ height: "100%" }}>
        <Outlet />
      </div>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};
