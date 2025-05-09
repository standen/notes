import { useCallback } from "react";
import { Link, useParams } from "react-router";
import classNames from "classnames/bind";
import Editor from "@monaco-editor/react";

import { useNoteParams, useNotesActions } from "@/hooks";

import { Splitter, Card, Button, Flex, Tag } from "antd";
import { UserOutlined, LinkOutlined } from "@ant-design/icons";

import styles from "./styles.module.scss";
const cx = classNames.bind(styles);

export const PageNotesEdit = () => {
  const { noteUrl } = useParams();

  const { noteParams } = useNoteParams(noteUrl);
  const { editNoteModal } = useNotesActions();

  const handleChangeParams = useCallback(async () => {
    const result = await editNoteModal(noteParams);
  }, [editNoteModal, noteParams]);

  if (!noteParams) {
    return <h1>Заметка отсутствует</h1>;
  }

  return (
    <section className={styles.main}>
      <Card
        title={
          <Flex gap={10}>
            <Tag icon={<UserOutlined />}>{noteParams?.author?.login}</Tag>
            <Tag icon={<LinkOutlined />}>{noteParams?.link}</Tag>
          </Flex>
        }
        extra={
          <Flex gap={10}>
            <Button onClick={handleChangeParams}>Параметры</Button>
            <Button type="primary">Сохранить</Button>
            <Link to="/notes">
              <Button>Вернуться</Button>
            </Link>
          </Flex>
        }
      >
        <Splitter>
          <Splitter.Panel min="20%">
            <Editor defaultLanguage="markdown" />
          </Splitter.Panel>
          <Splitter.Panel min="20%">123</Splitter.Panel>
        </Splitter>
      </Card>
    </section>
  );
};
