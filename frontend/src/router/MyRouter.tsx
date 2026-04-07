import { useEffect } from "react";
import { Route, Routes } from "react-router";

import { SYSTEM } from "@/constants";

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
  }, []);

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
        <Route path={SYSTEM.menu.accounts.url} element={<PageAccounts />} />
        <Route path={SYSTEM.menu.notes.url} element={<PageNotesList />} />
        <Route path={SYSTEM.menu.events.url} element={<PageEvents />} />
        <Route path={SYSTEM.menu.pays.url} element={<PagePays />} />
        <Route path={SYSTEM.menu.settings.url} element={<PageSettings />} />
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
