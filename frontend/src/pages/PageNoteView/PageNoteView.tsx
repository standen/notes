import classNames from "classnames/bind";
import { useParams } from "react-router";

import { Content } from "@/views/ViewMain/components";

import styles from "./styles.module.scss";
const cx = classNames.bind(styles);

export const PageNoteView = () => {
  const { noteLink } = useParams();

  return (
    <div className={cx("note")}>
      <Content>Notelink: {noteLink}</Content>
    </div>
  );
};
