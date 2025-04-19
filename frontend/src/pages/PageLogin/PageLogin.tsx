import { FC } from "react";
import classNames from "classnames/bind";

import { Input, Button, Typography } from "antd";
import { LoginOutlined } from "@ant-design/icons";

import styles from "./styles.module.scss";
const cx = classNames.bind(styles);

export const PageLogin: FC = () => {
  return (
    <section className={cx(["grid"])}>
      <div className={cx(["login-form"])}>
        <div>notes</div>
        <div className={cx(["login-form-elems"])}>
          <div>
            <span>Для информации</span>
          </div>
          <div>
            <Typography.Text>Логин:</Typography.Text>
            <Input placeholder="Введите логин..." />
          </div>
          <div>
            <Typography.Text>Пароль:</Typography.Text>
            <Input.Password placeholder="Введите пароль..." />
          </div>
          <Button type="primary" icon={<LoginOutlined />}>
            Авторизоваться
          </Button>
        </div>
        {/* bottom login form */}
        <div />
      </div>
      <div className={cx(["login-image"])}></div>
    </section>
  );
};
