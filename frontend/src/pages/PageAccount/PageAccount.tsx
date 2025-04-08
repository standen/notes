import { FC } from "react";
import classNames from "classnames/bind";

import { Content } from "@/components";

import { Tag } from "antd";

import styles from "./styles.module.scss";
const cx = classNames.bind(styles);

export const PageAccount: FC = () => {
  return (
    <Content title="Аккаунты">
      <div className={cx(["accounts-card"])}>
        <div className={cx(["accounts-card-item"])}>
          <span className={cx(["login"])}>GitHub</span>
          <span>09.04.2025 01:23:45</span>
          <span>
            <Tag color="processing">логин</Tag>
            <Tag color="processing">пароль</Tag>
            <Tag color="warning">изменить</Tag>
            <Tag color="error">удалить</Tag>
          </span>
        </div>
        <div className={cx(["accounts-card-item"])}>
          <span className={cx(["login"])}>GitHub</span>
          <span>09.04.2025 01:23:45</span>
          <span>
            <Tag color="processing">логин</Tag>
            <Tag color="processing">пароль</Tag>
            <Tag color="warning">изменить</Tag>
            <Tag color="error">удалить</Tag>
          </span>
        </div>
        <div className={cx(["accounts-card-item"])}>
          <span className={cx(["login"])}>GitHub</span>
          <span>09.04.2025 01:23:45</span>
          <span>
            <Tag color="processing">логин</Tag>
            <Tag color="processing">пароль</Tag>
            <Tag color="warning">изменить</Tag>
            <Tag color="error">удалить</Tag>
          </span>
        </div>
      </div>
    </Content>
  );
};
