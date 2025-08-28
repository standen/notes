import classNames from "classnames/bind";

import { ERRORS_TEXT } from "@/constants";

import { Empty } from "antd";

import styles from "./styles.module.scss";
const cx = classNames.bind(styles);

export const PageError404 = () => (
  <div className={cx("page404")}>
    <Empty description={ERRORS_TEXT.error404} />
  </div>
);
