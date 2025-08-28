import { Route, Routes } from "react-router";

import { NavMenu } from "@/router/constants";

import { useAuth } from "@/hooks";

import { ViewMain } from "@/views";
import {
  PageSettings,
  PageNotes,
  PageAccounts,
  PageBirthdays,
  PageError404,
} from "@/pages";
import { useEffect } from "react";

export const MyRouter = () => {
  const { getUserInfo } = useAuth();

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  return (
    <Routes>
      <Route path="" element={<ViewMain />}>
        <Route path={NavMenu.PageAccounts.url} element={<PageAccounts />} />
        <Route path={NavMenu.PageNotes.url} element={<PageNotes />} />
        <Route path={NavMenu.PageBirthdays.url} element={<PageBirthdays />} />
        <Route path={NavMenu.PageSettings.url} element={<PageSettings />} />
      </Route>

      <Route path="*" element={<PageError404 />} />
    </Routes>
  );
};
