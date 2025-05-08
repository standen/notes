import { useCallback } from "react";
import { useParams } from "react-router";
import classNames from "classnames/bind";
import Editor from "@monaco-editor/react";

import { useNotes } from "@/hooks";

import { Splitter, Card, Button, Flex, Tag } from "antd";

import styles from "./styles.module.scss";
import { useEffect } from "react";
const cx = classNames.bind(styles);

export const PageNotesEdit = () => {
  const { noteUrl } = useParams();

  const { editNoteModal, noteParams } = useNotes(noteUrl);

  const handleChangeParams = useCallback(async () => {
    const result = await editNoteModal(noteParams);
  }, [editNoteModal, noteParams]);

  return (
    <section className={styles.main}>
      <Card
        title={
          <Flex gap={10}>
            <Tag>{noteParams?.author?.login}</Tag>
            <Tag>{noteParams?.link}</Tag>
          </Flex>
        }
        extra={<Button onClick={handleChangeParams}>Параметры</Button>}
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
