import { type FC, type PropsWithChildren } from "react";

import { storeRequestLoader } from "@/store";

import { Spin } from "antd";

export const Loader: FC<PropsWithChildren> = ({ children }) => {
  const { load } = storeRequestLoader();
  return <Spin spinning={load}>{children}</Spin>;
};
