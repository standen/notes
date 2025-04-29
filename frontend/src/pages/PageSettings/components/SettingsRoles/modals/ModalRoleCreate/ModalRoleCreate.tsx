import { useModal } from "@/hooks";
import { Modal } from "antd";

export const ModalRoleCreate = () => {
  const { isShow, toggleModal } = useModal();
  return (
    <>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </>
  );
};
