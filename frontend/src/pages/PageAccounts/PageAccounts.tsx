import { FC } from "react";
import classNames from "classnames/bind";

import { Content } from "@/components";

import { Card } from "@/ui";
import { Flex, Button } from "antd";

import styles from "./styles.module.scss";
const cx = classNames.bind(styles);

export const PageAccounts: FC = () => {
  return (
    <Content title="Аккаунты">
      <Flex vertical gap={10}>
        <Card>
          <Flex justify="space-between">
            <div>search</div>
            <div>
              <Button>Добавить аккаунт</Button>
            </div>
          </Flex>
        </Card>
        <Card>logins</Card>
      </Flex>
    </Content>
  );
};
