import { FC } from "react";

import { useRoles } from "@/hooks";

import { IUserFormValues, IUser } from "@/api";

import { Form, Input, Select, Button, Flex } from "antd";

interface Props {
  userParams?: Partial<IUser>;
  getValues: (value: IUserFormValues) => void;
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
        name="password"
        label="Пароль"
        rules={[{ required: true, message: "Поле является обязательным" }]}
      >
        <Input.Password placeholder="Пароль..." allowClear />
      </Form.Item>
      <Form.Item
        name="roleId"
        label="Роль"
        initialValue={userParams?.role?.id}
        rules={[{ required: true, message: "Поле является обязательным" }]}
      >
        <Select
          placeholder="Роль..."
          disabled={!rolesList}
          options={rolesList?.map((item) => ({
            label: item.name,
            value: item.id,
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
