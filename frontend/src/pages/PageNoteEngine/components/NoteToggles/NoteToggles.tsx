import { type FC } from "react";

import { Flex, Button, Tooltip } from "antd";
import { FormOutlined, EyeOutlined, LockOutlined } from "@ant-design/icons";

interface Props {
  open: boolean;
  edit: boolean;
  cipher: boolean;
  changeOpen: () => void;
  changeEdit: () => void;
  changeCipher: () => void;
}

export const NoteToggles: FC<Props> = (props) => {
  const { open, edit, cipher, changeOpen, changeEdit, changeCipher } = props;

  return (
    <Flex gap={8}>
      <Tooltip title="Каждый может просматривать">
        <Button
          type={open ? "primary" : "default"}
          icon={<EyeOutlined />}
          onClick={changeOpen}
        />
      </Tooltip>
      <Tooltip title="Каждый может редактировать">
        <Button
          type={edit ? "primary" : "default"}
          icon={<FormOutlined />}
          onClick={changeEdit}
        />
      </Tooltip>
      <Tooltip title="Отметка зашифрована">
        <Button
          type={cipher ? "primary" : "default"}
          icon={<LockOutlined />}
          onClick={changeCipher}
        />
      </Tooltip>
    </Flex>
  );
};
