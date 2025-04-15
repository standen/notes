import { FC } from "react";
import { Routes, Route } from "react-router";

import {
  PageTemplate,
  PageAccounts,
  PageBirthdays,
  PageNotes,
  PageSettings,
} from "@/pages";

import { MenuItems } from "./MenuItems";

export const MyRouter: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PageTemplate />}>
        <Route path={MenuItems.PageAccounts.link} element={<PageAccounts />} />
        <Route path={MenuItems.PageNotes.link} element={<PageNotes />} />
        <Route
          path={MenuItems.PageBirthdays.link}
          element={<PageBirthdays />}
        />

        <Route path={MenuItems.PageSettings.link} element={<PageSettings />} />
      </Route>
    </Routes>
  );
};
