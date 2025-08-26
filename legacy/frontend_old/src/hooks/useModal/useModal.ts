import { useState } from "react";

export const useModal = () => {
  const [isShow, setIsShow] = useState<boolean>(false);

  const toggleModal = () => setIsShow(!isShow);

  return { toggleModal, isShow };
};
