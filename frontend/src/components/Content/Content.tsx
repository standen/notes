import { FC, PropsWithChildren } from "react";
import classNames from "classnames/bind";

import { TContent } from "./types";

import styles from "./styles.module.scss";
const cx = classNames.bind(styles);

export const Content: FC<PropsWithChildren<TContent>> = (props) => {
  const { title, children } = props;
  return (
    <section className={cx(["content"])}>
      <div className={cx(["content-header"])}>
        <i className="fa-solid fa-angles-right"></i>
        {title}
      </div>
      <div className={cx(["content-body"])}>{children}</div>
    </section>
  );
};
