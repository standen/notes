import type { FC } from "react";

import { ERRORS_TEXT } from "@/constants";

import { useReportError } from "@/hooks/useReportError";

import {
  SYMBOLS_LOGIN,
  SYMBOLS_PASSWORD,
  validateLogin,
  validatePassword,
} from "./validators";

import { Button, Flex, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

export type TFormAuth = {
  login: string;
  password: string;
};

interface Props {
  resolve: (values: TFormAuth) => void;
}

export const FormAuth: FC<Props> = ({ resolve }) => {
  const { showSimpleError } = useReportError();
  return (
    <Form<TFormAuth>
      layout="vertical"
      autoComplete="off"
      onFinish={(values) => resolve(values)}
      onFinishFailed={() => showSimpleError(ERRORS_TEXT.notAllValidate)}
    >
      <Form.Item
        name="login"
        label="Логин"
        tooltip={`Допустимые символы: "${SYMBOLS_LOGIN}"`}
        rules={[
          { required: true, message: ERRORS_TEXT.required },
          {
            validator: (_, value) => {
              if (!validateLogin(value)) {
                return Promise.reject();
              }
              return Promise.resolve();
            },
            message: ERRORS_TEXT.regexp,
          },
        ]}
      >
        <Input placeholder="Логин..." allowClear prefix={<UserOutlined />} />
      </Form.Item>
      <Form.Item
        name="password"
        label="Пароль"
        tooltip={`Допустимые символы: "${SYMBOLS_PASSWORD}"`}
        rules={[
          { required: true, message: ERRORS_TEXT.required },
          {
            validator: (_, value) => {
              if (!validatePassword(value)) {
                return Promise.reject();
              }
              return Promise.resolve();
            },
            message: ERRORS_TEXT.regexp,
          },
        ]}
      >
        <Input.Password
          placeholder="Пароль..."
          allowClear
          prefix={<LockOutlined />}
        />
      </Form.Item>
      <Flex justify="flex-end">
        <Button type="primary" htmlType="submit">
          Авторизоваться
        </Button>
      </Flex>
    </Form>
  );
};
