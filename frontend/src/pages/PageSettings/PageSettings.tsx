import { FC } from "react";
import classNames from "classnames/bind";

import { Content } from "@/components";
import { Card } from "@/ui";
import { Tabs } from "antd";

import styles from "./styles.module.scss";
const cx = classNames.bind(styles);

export const PageSettings: FC = () => {
  return (
    <Content title="Настройки">
      <Tabs
        defaultActiveKey="0"
        items={[
          {
            label: "Глобальные",
            key: "0",
            children: <Card>0</Card>,
          },
          {
            label: "Пользователи",
            key: "1",
            children: <Card>1</Card>,
          },
          {
            label: "Роли",
            key: "2",
            children: <Card>2</Card>,
          },
          {
            label: "Разрешения",
            key: "4",
            children: <Card>4</Card>,
          },
        ]}
      />
    </Content>
  );
};
