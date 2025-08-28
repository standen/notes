import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

import { PAGES_NAMES } from "@/router/types";
import { NavMenu } from "@/router/constants";

import { Menu } from "antd";

export const HeaderMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (PAGES_NAMES.includes(location.pathname)) {
      navigate(location.pathname);
    }
  }, [location, navigate]);

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={[
        PAGES_NAMES.find((item) => NavMenu[item]?.url === location.pathname) ??
          PAGES_NAMES[0],
      ]}
      items={PAGES_NAMES.map((item) => ({
        key: item,
        label: NavMenu[item]?.title,
      }))}
      style={{ flex: 1, minWidth: 0 }}
      onSelect={({ key }) => navigate(NavMenu[key]?.url ?? PAGES_NAMES[0])}
    />
  );
};
