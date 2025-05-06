import { useParams } from "react-router";
import Editor from "@monaco-editor/react";

import { Splitter } from "antd";
import { Card } from "@/ui";

import style from "./styles.module.scss";

export const PageNotesEdit = () => {
  const urlParams = useParams();

  return (
    <Card classname={style.main}>
      <Splitter>
        <Splitter.Panel>
          <Editor defaultLanguage="markdown" className={style.editor} />
        </Splitter.Panel>

        <Splitter.Panel>123</Splitter.Panel>
      </Splitter>
    </Card>
  );
};
