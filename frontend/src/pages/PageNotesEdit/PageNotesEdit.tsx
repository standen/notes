import { useParams } from "react-router";
import classNames from "classnames/bind";
import Editor from "@monaco-editor/react";

import { NoteActions } from "./components";

import { Splitter, Card } from "antd";

import styles from "./styles.module.scss";
const cx = classNames.bind(styles);

export const PageNotesEdit = () => {
  const urlParams = useParams();

  return (
    <section className={styles.main}>
      <Card title={<NoteActions />}>
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
