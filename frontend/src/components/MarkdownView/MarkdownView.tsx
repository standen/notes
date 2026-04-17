import { type FC } from "react";
import Markdown from "react-markdown";

import styles from "./styles.module.scss";

interface Props {
  noteText: string;
}

export const MarkdownView: FC<Props> = (props) => {
  const { noteText } = props;

  return (
    <div className={styles.noteView}>
      <Markdown
        components={{
          p: ({ children }) => <div>{children}</div>,
          h1: ({ children }) => <div>{children}</div>,
        }}
      >
        {noteText}
      </Markdown>
    </div>
  );
};
