import { type FC } from "react";

import { Form } from "antd";

interface Props {
  title: string;
}

export const FormEditRole: FC<Props> = ({ title }) => {
  return <Form>{title}</Form>;
};
