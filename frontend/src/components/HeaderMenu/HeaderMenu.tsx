import classNames from "classnames/bind";
import { useNavigate, useLocation } from "react-router";

import type { IEntities } from "@/api/generated_types";

import { storeUserInfo } from "@/store";
import { SYSTEM } from "@/constants";
import { compareStringArrays } from "@/utils";

import { Menu } from "antd";
import type { MenuItemType } from "antd/es/menu/interface";

import styles from "./styles.module.scss";
const cx = classNames.bind(styles);

export const HeaderMenu = () => {
  const { user } = storeUserInfo();

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={[
        Object.keys(SYSTEM.menu).includes(location?.pathname?.replace("/", ""))
          ? location.pathname.replace("/", "")
          : Object.keys(SYSTEM.menu)[0],
      ]}
      items={Object.entries(SYSTEM.menu).reduce((acc, item) => {
        if (item[1]?.is_menu_item) {
          if (
            compareStringArrays(
              item[1]?.permissions,
              user?.allowedActions ?? [],
            )
          ) {
            acc.push({
              key: item[0],
              label: <div className={cx(["menuItem"])}>{item[1]?.title}</div>,
            });
          }
        }

        return acc;
      }, [] as MenuItemType[])}
      style={{ flex: 1, minWidth: 0 }}
      onSelect={({ key }) =>
        navigate(SYSTEM.menu[key as IEntities]?.url ?? SYSTEM.menu.accounts.url)
      }
    />
  );
};
