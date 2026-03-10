import { useEffect, type FC } from "react";
import { useNavigate, useLocation } from "react-router";
import classNames from "classnames/bind";

import { NavMenu } from "@/router/constants";

import { useNoteToggles } from "@/pages/PageNoteEngine/components/NoteToggles/hooks";

import { MarkdownView, MarkdownEditor } from "@/components";
import { Content, Title } from "@/views/ViewMain/components";
import { NoteToggles } from "./components";

import { Flex, Button, Tag, Alert } from "antd";

import styles from "./styles.module.scss";
const cx = classNames.bind(styles);

export const PageNoteEngine: FC = () => {
  const { open, edit, cipher, changeOpen, changeEdit, changeCipher } =
    useNoteToggles();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location?.state?.noteLink) {
      console.log(location?.state?.noteLink);
    }
  }, [location?.state?.noteLink]);

  if (!location?.state?.noteLink) {
    return "Заметка не существует!";
  }

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
            <Alert message="123" />
          </>
        }
        left={
          <Flex gap={8}>
            <Button type="primary">Сохранить</Button>
            <Button onClick={() => navigate(NavMenu.PageNotes.url)}>
              Вернуться
            </Button>
          </Flex>
        }
      />
      <div className={cx("noteEditContent")}>
        <Content>
          <MarkdownView />
        </Content>
        <Content>
          <MarkdownEditor />
        </Content>
      </div>
    </>
  );
};
