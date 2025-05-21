import { FC } from "react";
import classNames from "classnames/bind";

import { useAuth } from "@/hooks";

import {
  symbolsLogin,
  symbolsPassword,
  validateLogin,
  validatePassword,
} from "@/utils/validators/validatorLogin";

import { Input, Button, Form } from "antd";
import { LoginOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";

import styles from "./styles.module.scss";
const cx = classNames.bind(styles);

export const PageLogin: FC = () => {
  const { loginAction } = useAuth();
  const [form] = Form.useForm();

  return (
    <section className={cx("grid")}>
      <div className={cx("login-form")}>
        <div>notes</div>
        <div>
          <Form
            form={form}
            layout="vertical"
            onFinish={(values) => loginAction(values)}
          >
            <Form.Item
              name="login"
              label="Логин"
              tooltip={`Допустимые символы: "${symbolsLogin}"`}
              rules={[
                { required: true, message: "Поле является обязательным" },
                {
                  validator: (_, value) => {
                    if (!validateLogin(value)) {
                      return Promise.reject();
                    }
                    return Promise.resolve();
                  },
                  message: "Недопустимые символы",
                },
              ]}
            >
              <Input
                placeholder="Логин..."
                allowClear
                prefix={<UserOutlined />}
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Пароль"
              tooltip={`Допустимые символы: "${symbolsPassword}"`}
              rules={[
                { required: true, message: "Поле является обязательным" },
                {
                  validator: (_, value) => {
                    if (!validatePassword(value)) {
                      return Promise.reject();
                    }
                    return Promise.resolve();
                  },
                  message: "Недопустимые символы",
                },
              ]}
            >
              <Input.Password
                placeholder="Пароль..."
                allowClear
                prefix={<LockOutlined />}
              />
            </Form.Item>
            <Button
              type="primary"
              icon={<LoginOutlined />}
              htmlType="submit"
              block
            >
              Авторизоваться
            </Button>
          </Form>
        </div>
        {/* bottom login form */}
        <div>Контакты для связи: tkadensky@ya.ru</div>
      </div>
      <div className={cx("login-image")}></div>
    </section>
  );
};
