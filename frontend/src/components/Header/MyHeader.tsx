import { FC } from "react";

import { Layout, Menu } from "antd";
const { Header } = Layout;

import styles from "./styles.module.scss";

export const MyHeader: FC = () => {
  return (
    <Header style={{ display: "flex", justifyContent: "space-between" }}>
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ flex: 1, minWidth: 0 }}
        items={[
          {
            key: "accounts",
            label: "Аккаунты",
            icon: <i className="fa-solid fa-user"></i>,
          },
          {
            key: "notes",
            label: "Заметки",
            icon: <i className="fa-solid fa-note-sticky"></i>,
          },
        ]}
      />
      <Menu
        theme="dark"
        mode="horizontal"
        items={[
          {
            key: "settings",
            label: "Настройки",
            icon: <i className="fa-solid fa-user"></i>,
          },
        ]}
      />
    </Header>
  );
};
