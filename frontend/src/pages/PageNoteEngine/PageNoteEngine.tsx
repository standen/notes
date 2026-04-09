import { type FC } from "react";
import { useNavigate, useLocation, useParams } from "react-router";

import { SYSTEM } from "@/constants";

import { useNoteToggles } from "@/pages/PageNoteEngine/components/NoteToggles/hooks";

import { MarkdownView, MarkdownEditor } from "@/components";
import { NoteToggles } from "./components";

import { Flex, Button, Tag } from "antd";

import styles from "./styles.module.scss";

export const PageNoteEngine: FC = () => {
  const { noteLink } = useParams();

  const { open, edit, cipher, changeOpen, changeEdit, changeCipher } =
    useNoteToggles();

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={styles.notePage}>
      <div className={styles.noteMenu}>
        <Flex gap={8} align="center">
          <div>
            <Tag variant="outlined" color="green">
              {location?.state?.link || noteLink}
            </Tag>
          </div>
          <NoteToggles
            open={open}
            edit={edit}
            cipher={cipher}
            changeOpen={changeOpen}
            changeEdit={changeEdit}
            changeCipher={changeCipher}
          />
        </Flex>
        <Flex gap={8}>
          <Button type="primary">Сохранить</Button>
          <Button onClick={() => navigate(SYSTEM.menu.notes.url)}>
            К списку заметок
          </Button>
        </Flex>
      </div>

      <div className={styles.noteEditContent}>
        <div className={styles.noteWorkSpace}>
          <MarkdownEditor />
        </div>
        <div className={styles.noteWorkSpace}>
          <MarkdownView />
        </div>
      </div>
    </div>
  );
};
