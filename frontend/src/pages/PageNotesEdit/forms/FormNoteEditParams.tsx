import { FC } from "react";
import { INote } from "@/api";

import { Form, Input, Button, Checkbox, Flex, ConfigProvider } from "antd";

interface Props {
  noteParams?: Partial<INote>;
  getValues: (value: Partial<INote>) => void;
}

export const FormNoteEditParams: FC<Props> = ({ getValues, noteParams }) => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={(values) => getValues(values)}
    >
      <Form.Item
        name="name"
        label="Наименование"
        initialValue={noteParams?.name}
        rules={[
          { required: true, message: "Поле является обязательным" },
          {
            validator: (_, value: string) => {
              const symbols =
                "абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ ";
              const valid = value
                .split("")
                .every((item) => symbols.includes(item));

              if (!valid) {
                return Promise.reject();
              }

              return Promise.resolve();
            },
            message:
              "Недопустимый символ: только кириллица и пробел",
          },
        ]}
      >
        <Input placeholder="Наименование" allowClear />
      </Form.Item>
      <Form.Item
        name="link"
        label="Ссылка"
        initialValue={noteParams?.link}
        rules={[
          { required: true, message: "Поле является обязательным" },
          {
            validator: (_, value: string) => {
              const symbols = "abcdefghijklmnopqrstuvwxyz-";
              const valid = value
                .split("")
                .every((item) => symbols.includes(item));

              if (!valid) {
                return Promise.reject();
              }

              return Promise.resolve();
            },
            message:
              "Недопустимый символ: только маленькие английские буквы и тире",
          },
        ]}
      >
        <Input placeholder="Ссылка" allowClear />
      </Form.Item>

      <ConfigProvider
        theme={{
          components: {
            Form: {
              itemMarginBottom: 6,
            },
          },
        }}
      >
        <div style={{ userSelect: "none" }}>
          <Form.Item name="is_cipher" valuePropName="checked">
            <Checkbox
              defaultChecked={noteParams?.is_cipher ?? false}
              onChange={(e) =>
                form.setFieldValue("is_cipher", e.target.checked)
              }
            >
              Шифровать заметку
            </Checkbox>
          </Form.Item>
          <Form.Item name="open_for_all" valuePropName="checked">
            <Checkbox
              defaultChecked={noteParams?.open_for_all ?? false}
              onChange={(e) =>
                form.setFieldValue("open_for_all", e.target.checked)
              }
            >
              Каждый пользователь может просматривать
            </Checkbox>
          </Form.Item>
          <Form.Item name="edit_everyone" valuePropName="checked">
            <Checkbox
              defaultChecked={noteParams?.edit_everyone ?? false}
              onChange={(e) =>
                form.setFieldValue("edit_everyone", e.target.checked)
              }
            >
              Каждый пользователь может редактировать
            </Checkbox>
          </Form.Item>
        </div>
      </ConfigProvider>

      <Flex justify="flex-end">
        <Button htmlType="submit" type="primary">
          Сохранить
        </Button>
      </Flex>
    </Form>
  );
};
