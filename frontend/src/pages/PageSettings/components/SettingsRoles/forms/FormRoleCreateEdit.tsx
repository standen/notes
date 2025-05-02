import { FC, useMemo } from "react";

import { useRoles, usePermissions } from "@/hooks";

import { Form, Input, Select, Flex, Button } from "antd";

interface Props {
  roleId?: string;
  roleNme?: string;
  roleParams?: {
    name: string;
    allowed_actions: string[];
  };
}

export const FormRoleCreateEdit: FC<Props> = ({
  roleId,
  roleNme,
  roleParams,
}) => {
  const { permissionsList } = usePermissions();
  const [form] = Form.useForm();

  const { createRoleAction } = useRoles();

  const isFieldsValidate = useMemo(
    () =>
      Object.keys(form.getFieldsValue()).every((key) =>
        form.getFieldValue(key)
      ),
    [form]
  );

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={() => {
        console.log(form.getFieldsValue());
        // return Promise.resolve(form.getFieldsValue());
      }}
    >
      <Form.Item
        name="name"
        label="Наименование роли"
        rules={[{ required: true, message: "Поле является обязательным" }]}
      >
        <Input placeholder="Наименование роли..." allowClear />
      </Form.Item>
      <Form.Item
        name="allowed_actions"
        label="Перечень допустимых значений"
        rules={[{ required: true, message: "Поле является обязательным" }]}
      >
        <Select
          mode="tags"
          disabled={!permissionsList}
          placeholder="Перечень допустимых значений..."
          options={permissionsList?.map((item) => ({
            label: item,
            value: item,
          }))}
          allowClear
        />
      </Form.Item>
      <Flex justify="flex-end">
        <Button
          type="primary"
          // onClick={() => createRoleAction(form.getFieldsValue())}
          disabled={!isFieldsValidate}
          htmlType="submit"
        >
          Создать
        </Button>
      </Flex>
    </Form>
  );
};
