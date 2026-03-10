import { type FC } from "react";

import { ERRORS_TEXT } from "@/constants";

import type { IRole, IUser } from "@/api/settings";

import { useReportError } from "@/hooks/useReportError";

import { Loader } from "@/components";

import { Form, Input, Select, Flex, Button } from "antd";

export type TFormEditUser = {
  login: string;
  password: string;
  roleId: string;
};

interface Props {
  roles: IRole[];
  userLogins: string[];
  resolve: (value: TFormEditUser) => void;
  userParams?: IUser | undefined;
}

export const FormEditUser: FC<Props> = (props) => {
  const { roles, userParams, userLogins, resolve } = props;

  const { showSimpleError } = useReportError();

  return (
    <Loader.body>
      <Form<TFormEditUser>
        layout="vertical"
        autoComplete="off"
        onFinish={(values) => resolve(values)}
        onFinishFailed={() => showSimpleError(ERRORS_TEXT.notAllValidate)}
      >
        <Form.Item
          name="login"
          initialValue={userParams?.login}
          label="Логин"
          // TODO
          tooltip={`Допустимые символы: ""`}
          rules={[
            { required: true, message: ERRORS_TEXT.required },
            {
              validator: (_, value) => {
                if (!value) {
                  return Promise.resolve();
                }
                // TODO
                if (false) {
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
          // TODO
          tooltip={`Допустимые символы: ""`}
          rules={[
            {
              required: true,
              message: ERRORS_TEXT.required,
              validator: (_, value) => {
                // при редактировании пароль может быть пустым
                if (userParams && !value) {
                  return Promise.resolve();
                }

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

                if (!userParams) {
                  // TODO
                  if (false) {
                    return Promise.reject();
                  }

                  return Promise.resolve();
                }

                if (userParams) {
                  // TODO
                  if (value && false) {
                    return Promise.reject();
                  }

                  return Promise.resolve();
                }
              },
              message: ERRORS_TEXT.regexp,
            },
          ]}
        >
          <Input.Password placeholder="Пароль..." allowClear />
        </Form.Item>
        <Form.Item
          name="roleId"
          label="Роль пользователя"
          initialValue={userParams?.role?.id}
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
            {userParams ? "Сохранить изменения" : "Добавить пользователя"}
          </Button>
        </Flex>
      </Form>
    </Loader.body>
  );
};
