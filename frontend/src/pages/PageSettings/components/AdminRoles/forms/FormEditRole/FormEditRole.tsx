import { type FC } from "react";

import { ERRORS_TEXT } from "@/constants";

import type { IRole } from "@/api/settings";

import { useReportError } from "@/hooks/useReportError";

import { Loader } from "@/components";

import { validateRoleName, SYMBOLS_ROLE_NAME } from "./validators";

import { Form, Input, Select, Flex, Button } from "antd";

export type TFormEditRole = {
  name: string;
  allowed_actions: string[];
};

interface Props {
  permissions: string[];
  rolesNames: string[];
  resolve: (value: TFormEditRole) => void;
  roleParams: IRole | undefined;
}

export const FormEditRole: FC<Props> = (props) => {
  const { permissions, rolesNames, roleParams, resolve } = props;

  const { showSimpleError } = useReportError();

  return (
    <Loader>
      <Form<TFormEditRole>
        layout="vertical"
        autoComplete="off"
        onFinish={(values) => resolve(values)}
        onFinishFailed={() => showSimpleError(ERRORS_TEXT.notAllValidate)}
      >
        <Form.Item
          name="name"
          initialValue={roleParams?.name}
          label="Наименование роли"
          tooltip={`Допустимые символы: "${SYMBOLS_ROLE_NAME}"`}
          rules={[
            { required: true, message: ERRORS_TEXT.required },
            {
              validator: (_, value) => {
                if (!validateRoleName(value)) {
                  return Promise.reject();
                }
                return Promise.resolve();
              },
              message: ERRORS_TEXT.regexp,
            },
            {
              validator: (_, value) => {
                if (!rolesNames.includes(value.toLowerCase())) {
                  return Promise.resolve();
                }
                return Promise.reject();
              },
              message: ERRORS_TEXT.roleExists,
            },
          ]}
        >
          <Input placeholder="Наименование роли..." allowClear />
        </Form.Item>
        <Form.Item
          name="allowed_actions"
          initialValue={roleParams?.allowed_actions}
          label="Перечень допустимых значений"
          rules={[{ required: true, message: ERRORS_TEXT.required }]}
        >
          <Select
            mode="multiple"
            disabled={permissions?.length === 0}
            placeholder="Перечень допустимых значений..."
            options={permissions?.map((item) => ({
              label: item,
              value: item,
            }))}
            allowClear
          />
        </Form.Item>
        <Flex justify="flex-end">
          <Button type="primary" htmlType="submit">
            {roleParams ? "Сохранить изменения" : "Добавить роль"}
          </Button>
        </Flex>
      </Form>
    </Loader>
  );
};
