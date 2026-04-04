import { useEffect } from "react";
import { Route, Routes } from "react-router";

import { NavMenu } from "@/router/constants";

import { useAuth } from "@/hooks";

import { Loader } from "@/components";
import { ViewMain } from "@/views";
import {
  PageSettings,
  PageNotesList,
  PageNoteEngine,
  PageNoteView,
  PageAccounts,
  PageEvents,
  PagePays,
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
          <Loader.body>
            <ViewMain />
          </Loader.body>
        }
      >
        <Route path={NavMenu.PageAccounts.url} element={<PageAccounts />} />
        <Route path={NavMenu.PageNotes.url} element={<PageNotesList />} />
        <Route path={NavMenu.PageEvents.url} element={<PageEvents />} />
        <Route path={NavMenu.PagePays.url} element={<PagePays />} />
        <Route path={NavMenu.PageSettings.url} element={<PageSettings />} />
      </Route>

      <Route
        path="/note/:noteLink"
        element={
          <Loader.body>
            <PageNoteView />
          </Loader.body>
        }
      />

      <Route
        path="/note/:noteLink/edit"
        element={
          <Loader.body>
            <PageNoteEngine />
          </Loader.body>
        }
      />

      <Route path="*" element={<PageError404 />} />
    </Routes>
  );
};
