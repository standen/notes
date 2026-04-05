import { type FC } from "react";
import { useNavigate, useLocation, useParams } from "react-router";
import classNames from "classnames/bind";

import { storeSystemVars } from "@/store";
import { useNoteToggles } from "@/pages/PageNoteEngine/components/NoteToggles/hooks";

import { MarkdownView, MarkdownEditor } from "@/components";
import { Content, Title } from "@/views/ViewMain/components";
import { NoteToggles } from "./components";

import { Flex, Button, Tag, Alert } from "antd";

import styles from "./styles.module.scss";
const cx = classNames.bind(styles);

export const PageNoteEngine: FC = () => {
  const { systemMenu } = storeSystemVars();

  const { noteLink } = useParams();

  const { open, edit, cipher, changeOpen, changeEdit, changeCipher } =
    useNoteToggles();

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <Title
        right={
          <>
            <NoteToggles
              open={open}
              edit={edit}
              cipher={cipher}
              changeOpen={changeOpen}
              changeEdit={changeEdit}
              changeCipher={changeCipher}
            />
            <Tag>{location?.state?.noteLink}</Tag>
            <Tag>{location?.state?.noteLink}</Tag>
            <Alert title="123" />
          </>
        }
        left={
          <Flex gap={8}>
            <Button type="primary">Сохранить</Button>
            {/* TODO */}
            <Button onClick={() => navigate(systemMenu?.notes?.url ?? "/")}>
              К списку заметок
            </Button>
          </Flex>
        }
      />
      <div className={cx("noteEditContent")}>
        <Content>
          <MarkdownEditor />
        </Content>
        <Content>
          <MarkdownView />
        </Content>
      </div>
    </>
  );
};
