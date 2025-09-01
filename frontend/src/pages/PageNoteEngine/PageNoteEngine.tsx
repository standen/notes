import { type FC } from "react";
import { useNavigate, useLocation } from "react-router";

import { NavMenu } from "@/router/constants";

import { useNoteToggles } from "@/pages/PageNoteEngine/components/NoteToggles/hooks";

import { Content, Title } from "@/views/ViewMain/components";
import { NoteToggles } from "./components";

import { Flex, Button } from "antd";

export const PageNoteEngine: FC = () => {
  const { open, edit, cipher, changeOpen, changeEdit, changeCipher } =
    useNoteToggles();

  const navigate = useNavigate();
  const location = useLocation();

  console.log(location?.state?.noteLink);

  return (
    <>
      <Title
        left={
          <NoteToggles
            open={open}
            edit={edit}
            cipher={cipher}
            changeOpen={changeOpen}
            changeEdit={changeEdit}
            changeCipher={changeCipher}
          />
        }
        right={
          <Flex gap={8}>
            <Button type="primary">Сохранить</Button>
            <Button onClick={() => navigate(NavMenu.PageNotes.url)}>
              Вернуться
            </Button>
          </Flex>
        }
      />
      <Content>123</Content>
    </>
  );
};
