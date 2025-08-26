import { FC } from "react";
import Markdown from "react-markdown";

import { Tag } from "antd";

import styles from "./styles.module.scss";

interface Props {
  text?: string;
}
export const MarkdownView: FC<Props> = ({ text }) => {
  return (
    <section className={styles.markdown}>
      <Markdown
        components={{
          h1(props) {
            return <Tag>{props.children}</Tag>;
          },
        }}
      >
        {text}
      </Markdown>
    </section>
  );
};
