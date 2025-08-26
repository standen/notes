import { useState } from "react";
import { Link, useParams } from "react-router";
import classNames from "classnames/bind";
import Editor from "@monaco-editor/react";

import { useNoteParams } from "@/hooks";
import { MarkdownView } from "@/components";
import { NoteActions } from "./components";

import { Splitter, Card, Button, Flex, Tag } from "antd";
import { UserOutlined, LinkOutlined } from "@ant-design/icons";

import styles from "./styles.module.scss";
const cx = classNames.bind(styles);

export const PageNotesEdit = () => {
  const { noteUrl } = useParams();

  const { noteParams } = useNoteParams(noteUrl);

  const [textNote, setTextNote] = useState<string>();

  if (!noteParams) {
    return <h1>Заметка отсутствует</h1>;
  }

  return (
    <section className={styles.main}>
      <Card
        title={
          <Flex gap={10}>
            <Tag color="#87d068">{noteParams?.name}</Tag>
            <Tag icon={<UserOutlined />}>{noteParams?.author?.login}</Tag>
            <Tag icon={<LinkOutlined />}>{noteParams?.link}</Tag>
            <NoteActions />
          </Flex>
        }
        extra={
          <Flex gap={10}>
            <Button type="primary">Сохранить</Button>
            <Link to="/notes">
              <Button>Вернуться</Button>
            </Link>
          </Flex>
        }
      >
        <Splitter className={styles.editor}>
          <Splitter.Panel min="20%">
            <Editor
              defaultLanguage="markdown"
              onChange={(e) => setTextNote(e)}
              height="90vh"
            />
          </Splitter.Panel>
          <Splitter.Panel min="20%">
            <MarkdownView text={textNote} />
          </Splitter.Panel>
        </Splitter>
      </Card>
    </section>
  );
};
