import { FC } from "react";

import { MyHeader } from "@/components";

import { Layout } from "antd";

export const PageTemplate: FC = () => {
  return (
    <Layout>
      <MyHeader />
    </Layout>
  );
};
