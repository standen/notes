import classNames from "classnames/bind";

import { useNoteActions } from "../../hooks";

import { Flex } from "antd";

import styles from "./styles.module.scss";
const cx = classNames.bind(styles);

export const NoteActions = () => {
  const {
    handleCipher,
    handleEdit,
    handleRead,
    isCipher,
    isEditEveryOne,
    isReadEveryOne,
  } = useNoteActions();
  return (
    <Flex justify="space-between">
      <div className={styles.iconActions}>
        <i
          className={cx(
            "fa-solid",
            "fa-pen-to-square",
            isEditEveryOne && "activeAction"
          )}
          onClick={handleEdit}
        />
        <i
          className={cx("fa-solid", "fa-eye", isReadEveryOne && "activeAction")}
          onClick={handleRead}
        />
        <i
          className={cx(
            "fa-solid",
            "fa-key",
            isCipher && "activeAction"
          )}
          onClick={handleCipher}
        />
      </div>
    </Flex>
  );
};
