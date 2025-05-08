import classNames from "classnames/bind";

import { useNoteActions } from "../../hooks";

import { Button, Flex, Form, Input } from "antd";

import styles from "./styles.module.scss";
import { useForm } from "antd/es/form/Form";
const cx = classNames.bind(styles);

export const NoteActions = () => {
  const {
    handleCipher,
    handleEdit,
    handleRead,
    isCipher,
    isEditEveryOne,
    isReadEveryOne,
  } = useNoteActions();
  const [form] = useForm();
  return (
    <Flex justify="space-between">
      <div>
        <Form form={form} layout="inline">
          <Form.Item name="name" label="Наименование">
            <Input />
          </Form.Item>
          <Form.Item name="link" label="Ссылка">
            <Input />
          </Form.Item>
          <Button type="primary">Сохранить</Button>
        </Form>
      </div>
      <div className={styles.iconActions}>
        <i
          className={cx(
            "fa-solid",
            "fa-pen-to-square",
            isEditEveryOne && "activeAction"
          )}
          onClick={handleEdit}
        />
        <i
          className={cx("fa-solid", "fa-eye", isReadEveryOne && "activeAction")}
          onClick={handleRead}
        />
        <i
          className={cx(
            "fa-solid",
            "fa-unlock-keyhole",
            isCipher && "activeAction"
          )}
          onClick={handleCipher}
        />
      </div>
    </Flex>
  );
};
