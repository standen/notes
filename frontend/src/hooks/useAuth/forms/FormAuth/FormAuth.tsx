import type { FC } from "react";

import type { IAuthLoginRequest } from "@/api/generated_types";

import { validate } from "@/utils";
import { ERRORS_TEXT } from "@/constants";

import { useReportError } from "@/hooks/useReportError";

import { Button, Flex, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

export type TFormAuth = Omit<IAuthLoginRequest, "action">;

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
        tooltip={validate.login.requires}
        rules={[
          { required: true, message: ERRORS_TEXT.required },
          {
            validator: (_, value) => {
              if (!validate.login.check(value)) {
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
        tooltip={validate.password.requires}
        rules={[
          { required: true, message: ERRORS_TEXT.required },
          {
            validator: (_, value) => {
              if (!validate.password.check(value)) {
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
