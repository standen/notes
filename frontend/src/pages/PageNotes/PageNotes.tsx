import { FC, useState, useEffect } from "react";
import classNames from "classnames/bind";
import Editor from "@monaco-editor/react";
import axios from "axios";

import { endpoints } from "@/api";

import { Content } from "@/components";

import { Card } from "@/ui";
import { Flex, Button } from "antd";

import styles from "./styles.module.scss";
const cx = classNames.bind(styles);

export const PageNotes: FC = () => {
  const [note, setNote] = useState<string>();

  useEffect(() => {
    (async () => {
      await axios
        .get(endpoints.notes.allActions)
        .then((res) => setNote(res.data.text));
    })();
  });
  return (
    <Content title="Заметки">
      <Flex vertical gap={10}>
        <Card>
          <Flex justify="space-between">
            <div>search</div>
            <div>
              <Button
                onClick={async () => {
                  await axios.post(endpoints.notes.allActions, { text: note });
                }}
              >
                Добавить заметку
              </Button>
            </div>
          </Flex>
        </Card>
        <Card>
          <Editor
            defaultLanguage="markdown"
            height="500px"
            // onChange={(e) => setNote(e)}
            value={note}
            options={{
              lineDecorationsWidth: 0,
            }}
          />
        </Card>
      </Flex>
    </Content>
  );
};
