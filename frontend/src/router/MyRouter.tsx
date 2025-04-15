import { FC } from "react";
import { Routes, Route } from "react-router";

import {
  PageTemplate,
  PageAccounts,
  PageBirthdays,
  PageNotes,
  PageSettings,
} from "@/pages";

import { ELinks } from "./types";

export const MyRouter: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PageTemplate />}>
        <Route path={ELinks.accounts} element={<PageAccounts />} />
        <Route path={ELinks.birthdays} element={<PageBirthdays />} />
        <Route path={ELinks.notes} element={<PageNotes />} />
        <Route path={ELinks.settings} element={<PageSettings />} />
      </Route>
    </Routes>
  );
};
