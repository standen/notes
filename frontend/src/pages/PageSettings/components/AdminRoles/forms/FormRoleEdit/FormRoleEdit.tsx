import { type FC } from "react";

import { ERRORS_TEXT, SYSTEM } from "@/constants";
import { validate } from "@/utils";

import type { IRole, IRoleEditRequest } from "@/api/generated_types";

import { useReportError } from "@/hooks/useReportError";

import { Loader } from "@/components";

import { Button, Flex, Form, Input, Select } from "antd";

export type TFormRoleEdit = Omit<IRoleEditRequest, "role_id">;

interface Props {
  rolesNames: string[];
  resolve: (value: IRoleEditRequest) => void;
  roleParams: IRole | undefined;
}

export const FormRoleEdit: FC<Props> = (props) => {
  const { rolesNames, roleParams, resolve } = props;

  const { showSimpleError } = useReportError();

  return (
    <Loader.modal>
      <Form<IRoleEditRequest>
        layout="vertical"
        autoComplete="off"
        onFinish={(values) => resolve(values)}
        onFinishFailed={() => showSimpleError(ERRORS_TEXT.notAllValidate)}
      >
        <Form.Item
          name="name"
          initialValue={roleParams?.name}
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
          initialValue={roleParams?.allowed_actions}
          label="Перечень допустимых значений"
          rules={[{ required: true, message: ERRORS_TEXT.required }]}
        >
          <Select
            mode="multiple"
            placeholder="Перечень допустимых значений..."
            options={SYSTEM.permissions_list?.map((item) => ({
              label: item,
              value: item,
            }))}
            allowClear
          />
        </Form.Item>
        <Flex justify="flex-end">
          <Button type="primary" htmlType="submit">
            Сохранить изменения
          </Button>
        </Flex>
      </Form>
    </Loader.modal>
  );
};
