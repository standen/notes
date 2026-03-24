import { type FC } from "react";

import { validate } from "@/utils";
import { ERRORS_TEXT } from "@/constants";

import type { IRole, IUserCreateRequest } from "@/api/generated_types";

import { useReportError } from "@/hooks/useReportError";

import { Loader } from "@/components";

import { Form, Input, Select, Flex, Button } from "antd";

interface Props {
  roles: IRole[];
  userLogins: string[];
  resolve: (value: IUserCreateRequest) => void;
}

export const FormUserCreate: FC<Props> = (props) => {
  const { roles, userLogins, resolve } = props;

  const { showSimpleError } = useReportError();

  return (
    <Loader.modal>
      <Form<IUserCreateRequest>
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
                if (!value) {
                  return Promise.resolve();
                }

                if (!validate.login.check(value)) {
                  return Promise.reject();
                }

                return Promise.resolve();
              },
              message: ERRORS_TEXT.regexp,
            },
            {
              validator: (_, value) => {
                if (!userLogins.includes(value.toLowerCase())) {
                  return Promise.resolve();
                }
                return Promise.reject();
              },
              message: ERRORS_TEXT.loginExists,
            },
          ]}
        >
          <Input placeholder="Логин..." allowClear />
        </Form.Item>
        <Form.Item
          name="password"
          label="Пароль"
          tooltip={validate.password.requires}
          rules={[
            {
              required: true,
              message: ERRORS_TEXT.required,
              validator: (_, value) => {
                // при создании пароль обязательно должен быть
                if (!value) {
                  return Promise.reject();
                }

                return Promise.resolve();
              },
            },
            {
              validator: (_, value) => {
                if (!value) {
                  return Promise.resolve();
                }

                if (!validate.password.check(value)) {
                  return Promise.reject();
                }

                return Promise.resolve();
              },
              message: ERRORS_TEXT.regexp,
            },
          ]}
        >
          <Input.Password placeholder="Пароль..." allowClear />
        </Form.Item>
        <Form.Item
          name="role_id"
          label="Роль пользователя"
          rules={[{ required: true, message: ERRORS_TEXT.required }]}
        >
          <Select
            allowClear
            placeholder="Роль пользователя"
            options={roles?.map((item) => ({
              label: item?.name,
              value: item?.id,
            }))}
            disabled={roles?.length === 0}
          />
        </Form.Item>
        <Flex justify="flex-end">
          <Button type="primary" htmlType="submit">
            Добавить пользователя
          </Button>
        </Flex>
      </Form>
    </Loader.modal>
  );
};
