import { FC, useMemo } from "react";
import { usePermissions } from "@/hooks";

import { Form, Input, Select, Flex, Button } from "antd";

import { useRoles } from "../../hooks/useRoles";

export const ModalRoleCreate: FC = () => {
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
    <Form form={form} layout="vertical">
      <Form.Item
        name="roleName"
        label="Наименование роли"
        rules={[{ required: true, message: "Поле является обязательным" }]}
      >
        <Input placeholder="Наименование роли..." allowClear />
      </Form.Item>
      <Form.Item
        name="rolesList"
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
          onClick={() => createRoleAction(form.getFieldsValue())}
          disabled={!isFieldsValidate}
        >
          Создать
        </Button>
      </Flex>
    </Form>
  );
};
