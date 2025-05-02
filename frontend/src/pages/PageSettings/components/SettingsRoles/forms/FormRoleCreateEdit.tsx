import { FC, useMemo, useEffect } from "react";

import { usePermissions } from "@/hooks";

import { IRole } from "@/api";

import { Form, Input, Select, Flex, Button } from "antd";

interface Props {
  roleParams?: Partial<IRole>;
  getValues: (value: IRole) => void;
}

export const FormRoleCreateEdit: FC<Props> = ({ roleParams, getValues }) => {
  const { permissionsList } = usePermissions();
  const [form] = Form.useForm();

  const isFieldsValidate = useMemo(
    () =>
      Object.keys(form.getFieldsValue()).every((key) =>
        form.getFieldValue(key)
      ),
    [form]
  );

  useEffect(() => {
    if (roleParams) {
      form.setFieldsValue(roleParams);
    }
  }, [roleParams]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={(values) => getValues(values)}
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
          mode="multiple"
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
        <Button type="primary" htmlType="submit">
          Создать
        </Button>
      </Flex>
    </Form>
  );
};
