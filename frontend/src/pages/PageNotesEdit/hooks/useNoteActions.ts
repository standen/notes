import { useState, useEffect } from "react";
import { App } from "antd";

export const useNoteActions = () => {
  const { notification } = App.useApp();

  const [isCipher, setIsCipher] = useState<boolean>();
  const [isReadEveryOne, setIsReadEveryOne] = useState<boolean>();
  const [isEditEveryOne, setIsEditEveryOne] = useState<boolean>();

  const handleCipher = () => setIsCipher(!isCipher);
  const handleRead = () => setIsReadEveryOne(!isReadEveryOne);
  const handleEdit = () => setIsEditEveryOne(!isEditEveryOne);

  useEffect(() => {
    if (isCipher) {
      notification.success({
        message: "Теперь заметка будет зашифрована",
        placement: "bottomRight",
      });
    }

    if (typeof isCipher === "boolean" && !isCipher) {
      notification.warning({
        message: "Теперь заметка не шифруется",
        placement: "bottomRight",
      });
    }
  }, [isCipher]);

  useEffect(() => {
    if (isEditEveryOne) {
      notification.success({
        message: "Теперь заметка может редактироваться любым пользователем",
        placement: "bottomRight",
      });
    }

    if (typeof isEditEveryOne === "boolean" && !isEditEveryOne) {
      notification.warning({
        message: "Теперь заметка редактируется только владельцем",
        placement: "bottomRight",
      });
    }
  }, [isEditEveryOne]);

  useEffect(() => {
    if (isReadEveryOne) {
      notification.success({
        message: "Теперь заметка будет видна каждому пользователю",
        placement: "bottomRight",
      });
    }

    if (typeof isReadEveryOne === "boolean" && !isReadEveryOne) {
      notification.warning({
        message: "Теперь заметка видна только владельцу",
        placement: "bottomRight",
      });
    }
  }, [isReadEveryOne]);

  return {
    isCipher,
    isEditEveryOne,
    isReadEveryOne,
    handleCipher,
    handleEdit,
    handleRead,
  };
};
