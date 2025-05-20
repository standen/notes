import { FC } from "react";

import { Form, Input, Flex, Button } from "antd";

interface Props {
  initialValue?: string;
  fieldLabel: string;
  fieldValidator: (value: string) => boolean;
  allowedSymbols: string;
  getValues: (value: { name: string }) => void;
}
export const FormSimpleRename: FC<Props> = ({
  initialValue,
  getValues,
  fieldLabel,
  fieldValidator,
  allowedSymbols,
}) => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={(values) => getValues(values)}
    >
      <Form.Item
        name="name"
        initialValue={initialValue}
        tooltip={`Допустимые сиволы: "${allowedSymbols}"`}
        label={fieldLabel}
        rules={[
          { required: true, message: "Поле является обязательным" },
          {
            validator: (_, value: string) => {
              if (!fieldValidator(value)) {
                return Promise.reject();
              }
              return Promise.resolve();
            },
            message: "Недопустимые символы",
          },
        ]}
      >
        <Input placeholder={`${fieldLabel}...`} allowClear />
      </Form.Item>
      <Flex justify="flex-end">
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
      </Flex>
    </Form>
  );
};
