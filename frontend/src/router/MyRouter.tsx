import { useEffect } from "react";
import { Route, Routes } from "react-router";

import { NavMenu } from "@/router/constants";

import { useAuth } from "@/hooks";

import { Loader } from "@/components";
import { ViewMain } from "@/views";
import {
  PageSettings,
  PageNotes,
  PageNoteEngine,
  PageNoteView,
  PageAccounts,
  PageBirthdays,
  PageError404,
} from "@/pages";

export const MyRouter = () => {
  const { getUserInfo } = useAuth();

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  return (
    <Routes>
      <Route
        path=""
        element={
          <Loader>
            <ViewMain />
          </Loader>
        }
      >
        <Route path={NavMenu.PageAccounts.url} element={<PageAccounts />} />
        <Route path={NavMenu.PageNotes.url} element={<PageNotes />} />
        <Route path="/editnote" element={<PageNoteEngine />} />
        <Route path={NavMenu.PageBirthdays.url} element={<PageBirthdays />} />
        <Route path={NavMenu.PageSettings.url} element={<PageSettings />} />
      </Route>

      <Route
        path="/note/:noteLink"
        element={
          <Loader>
            <PageNoteView />
          </Loader>
        }
      />

      <Route path="*" element={<PageError404 />} />
    </Routes>
  );
};
