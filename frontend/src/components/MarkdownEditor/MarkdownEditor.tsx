import { type FC } from "react";
import Editor from "@monaco-editor/react";

interface Props {
  getValue: (value: string) => void;
}

export const MarkdownEditor: FC<Props> = (props) => {
  const { getValue } = props;
  return (
    <Editor
      defaultLanguage="markdown"
      defaultValue=""
      height="80vh"
      options={{ minimap: { enabled: false } }}
      onChange={(e) => getValue(e || "")}
    />
  );
};
