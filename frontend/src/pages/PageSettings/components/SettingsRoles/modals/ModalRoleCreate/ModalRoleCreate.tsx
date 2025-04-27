import { FC, PropsWithChildren, useState, useCallback, useEffect } from "react";
import axios from "axios";

import { endpoints, IPermissionsList } from "@/api";

import { Modal, Form, Spin } from "antd";

interface Props {
  
}

export const ModalRoleCreate: FC<PropsWithChildren<Props>> = (props) => {
  const { roleId, children, mode } = props;

  const [form] = Form.useForm();
  const [show, setShow] = useState<boolean>(false);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [permissions, setPermissions] = useState<string[]>();

  const createRole = useCallback(async () => {}, [roleId]);

  const getPermissions = async () => {
    setIsLoad(true);
    await axios
      .get<IPermissionsList>(endpoints.permissions.get)
      .then((res) => setPermissions(res.data.result.allowed_actions))
      .finally(() => setIsLoad(false));
  };

  useEffect(() => {
    getPermissions();
  }, []);

  return (
    <>
      <Spin spinning={isLoad}>
        <Modal
          title="Добавление роли"
          open={show}
          onCancel={() => setShow(false)}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </Spin>
      <div onClick={() => setShow(true)}>{children}</div>
    </>
  );
};
