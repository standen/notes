import { FC } from "react";

import { useRoles } from "@/hooks";

import { IUser } from "@/api";

import { Form, Input, Select, Button, Flex } from "antd";

interface Props {
  userParams?: Partial<IUser>;
  getValues: (value: IUser) => void;
}

export const FormUserCreateEdit: FC<Props> = ({ userParams, getValues }) => {
  const { rolesList } = useRoles();
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={(values) => getValues(values)}
    >
      <Form.Item
        name="login"
        label="Логин"
        initialValue={userParams?.login}
        rules={[{ required: true, message: "Поле является обязательным" }]}
      >
        <Input placeholder="Логин..." allowClear />
      </Form.Item>
      <Form.Item
        name="role"
        label="Роль"
        initialValue={userParams?.role}
        rules={[{ required: true, message: "Поле является обязательным" }]}
      >
        <Select
          placeholder="Роль..."
          disabled={!rolesList}
          options={rolesList?.map((item) => ({
            label: item,
            value: item,
          }))}
        />
      </Form.Item>
      <Flex justify="flex-end">
        <Button type="primary" htmlType="submit">
          {userParams ? "Сохранить изменения" : "Создать"}
        </Button>
      </Flex>
    </Form>
  );
};
