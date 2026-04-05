import { useEffect } from "react";
import classNames from "classnames/bind";
import { useNavigate, useLocation } from "react-router";

import { storeUserInfo, storeSystemVars } from "@/store";

import { Menu } from "antd";

import styles from "./styles.module.scss";
const cx = classNames.bind(styles);

export const HeaderMenu = () => {
  const { user } = storeUserInfo();
  const { systemMenu } = storeSystemVars();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (Object.keys(systemMenu!).includes(location.pathname)) {
      navigate(location.pathname);
    }
    console.log(location);
  }, [location, navigate]);

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      // defaultSelectedKeys={[
      //   PAGES_NAMES?.find(
      //     (item) => NavMenu?.[item]?.url === location?.pathname,
      //   ) ?? "",
      // ]}
      // items={PAGES_NAMES.filter((item) => NavMenu?.[item]?.isMenuItem).map(
      //   (item) => ({
      //     key: item,
      //     label: (
      //       <div className={cx(["menuItem"])}>{NavMenu?.[item]?.title}</div>
      //     ),
      //   }),
      // )}
      style={{ flex: 1, minWidth: 0 }}
      // onSelect={({ key }) =>
      //   navigate(NavMenu[key as TMenuPagesNames]?.url ?? PAGES_NAMES[0])
      // }
    />
  );
};
