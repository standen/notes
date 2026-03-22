import { type FC } from "react";

import { validate } from "@/utils";

import { ERRORS_TEXT } from "@/constants";

import type { IRoleCreateRequest } from "@/api/generated_types";

import { useReportError } from "@/hooks/useReportError";

import { Loader } from "@/components";

import { Form, Input, Select, Flex, Button } from "antd";

interface Props {
  permissions: string[];
  rolesNames: string[];
  resolve: (value: IRoleCreateRequest) => void;
}

export const FormRoleCreate: FC<Props> = (props) => {
  const { permissions, rolesNames, resolve } = props;

  const { showSimpleError } = useReportError();

  return (
    <Loader.body>
      <Form<IRoleCreateRequest>
        layout="vertical"
        autoComplete="off"
        onFinish={(values) => resolve(values)}
        onFinishFailed={() => showSimpleError(ERRORS_TEXT.notAllValidate)}
      >
        <Form.Item
          name="name"
          label="Наименование роли"
          tooltip={validate.roleName.requires}
          rules={[
            { required: true, message: ERRORS_TEXT.required },
            {
              validator: (_, value) => {
                if (!validate.roleName.check(value)) {
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
            Добавить роль
          </Button>
        </Flex>
      </Form>
    </Loader.body>
  );
};
