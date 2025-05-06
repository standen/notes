import { FC } from "react";
import { Routes, Route } from "react-router";

import {
  PageTemplate,
  PageAccounts,
  PageBirthdays,
  PageNotes,
  PageNotesEdit,
  PageNotesView,
  PagePayments,
  PageSettings,
  PageLogin,
} from "@/pages";

import { MenuItems } from "./MenuItems";

export const MyRouter: FC = () => {
  return (
    <Routes>
      <Route path={`/${MenuItems.PageLogin.link}`} element={<PageLogin />} />
      <Route path="/" element={<PageTemplate />}>
        <Route path={MenuItems.PageAccounts.link} element={<PageAccounts />} />
        <Route path={MenuItems.PageNotes.link} element={<PageNotes />} />
        <Route path={MenuItems.PagePayments.link} element={<PagePayments />} />
        <Route
          path={MenuItems.PageBirthdays.link}
          element={<PageBirthdays />}
        />

        <Route path={MenuItems.PageSettings.link} element={<PageSettings />} />
      </Route>
      <Route path={`/note/:noteUrl`} element={<PageNotesView />} />
      <Route path={`/note/edit/:noteUrl`} element={<PageNotesEdit />} />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
};
