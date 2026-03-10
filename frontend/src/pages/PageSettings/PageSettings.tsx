import { useMemo, useState } from "react";

import {
  type TSettingsItems,
  SETTINGS_ITEMS,
} from "@/pages/PageSettings/types";

import {
  AdminGlobals,
  AdminRoles,
  AdminUsers,
} from "@/pages/PageSettings/components";
import { Title } from "@/views/ViewMain/components";

import { Segmented } from "antd";

export const PageSettings = () => {
  const [currentItem, setCurrentItem] = useState<TSettingsItems>("Параметры");

  const content = useMemo(() => {
    if (currentItem === "Параметры") {
      return <AdminGlobals />;
    }

    if (currentItem === "Пользователи") {
      return <AdminUsers />;
    }

    if (currentItem === "Роли") {
      return <AdminRoles />;
    }

    return <></>;
  }, [currentItem]);

  return (
    <>
      <Title
        right={
          <Segmented<TSettingsItems>
            defaultValue={currentItem}
            shape="round"
            options={[...SETTINGS_ITEMS]}
            onChange={setCurrentItem}
          />
        }
        left={<></>}
      />
      {content}
    </>
  );
};
