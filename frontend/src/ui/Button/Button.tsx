import { FC } from "react";
import classNames from "classnames/bind";

import { TButton } from "./types";
import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

export const Button: FC<TButton> = (props) => {
  const { type, text, onClick } = props;
  return (
    <button
      type="button"
      className={cx("btn", `btn-${type}`)}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
