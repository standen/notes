import { FC } from "react";
import classNames from "classnames/bind";

import { Content } from "@/components";
import { Card } from "@/ui";
import { Tabs } from "antd";

import { SettingsRoles, SettingsUsers } from "./components";

import styles from "./styles.module.scss";
const cx = classNames.bind(styles);

export const PageSettings: FC = () => {
  return (
    <Content title="Настройки">
      <Tabs
        defaultActiveKey="global-settings"
        items={[
          {
            label: "Глобальные",
            key: "global-settings",
            children: <Card>0</Card>,
          },
          {
            label: "Пользователи",
            key: "users",
            children: <SettingsUsers />,
          },
          {
            label: "Роли",
            key: "roles",
            children: <SettingsRoles />,
          },
          {
            label: "ЖКХ",
            key: "payments",
            children: <Card>ЖКХ</Card>,
          },
        ]}
      />
    </Content>
  );
};
