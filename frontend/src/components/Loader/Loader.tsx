import { type FC, type PropsWithChildren } from "react";

import { storeRequestLoader, storeSystemVars } from "@/store";

import { Spin } from "antd";

const LoaderBody: FC<PropsWithChildren> = ({ children }) => {
  const { load } = storeRequestLoader();
  const { systemMenu, systemPermissions } = storeSystemVars();

  return (
    <Spin spinning={load || !systemMenu || !systemPermissions}>{children}</Spin>
  );
};

const LoaderModal: FC<PropsWithChildren> = ({ children }) => {
  const { loadModal } = storeRequestLoader();
  return <Spin spinning={loadModal}>{children}</Spin>;
};

export const Loader = {
  body: LoaderBody,
  modal: LoaderModal,
};
