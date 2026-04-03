import type { FC } from "react";

import { validate } from "@/utils";
import { ERRORS_TEXT } from "@/constants";

import { Input, Form, Button, Flex } from "antd";
import { Loader } from "@/components/Loader";

interface Props {
  resolve: (key: string) => void;
}

export const FormUserKey: FC<Props> = (props) => {
  const { resolve } = props;

  return (
    <Loader.modal>
      <Form
        layout="vertical"
        autoComplete="off"
        onFinish={(values) => resolve(values?.key)}
      >
        <Form.Item
          name="key"
          label="Ключ шифрования"
          tooltip={validate.key.requires}
          rules={[
            {
              validator: (_, value) => {
                if (!validate.key.check(value)) {
                  return Promise.reject();
                }
                return Promise.resolve();
              },
              message: ERRORS_TEXT.regexp,
            },
          ]}
        >
          <Input placeholder="Ключ шифрования..." allowClear />
        </Form.Item>
        <Flex justify="flex-end">
          <Button type="primary" htmlType="submit">
            Сохранить ключ
          </Button>
        </Flex>
      </Form>
    </Loader.modal>
  );
};
