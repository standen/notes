import { useEffect } from "react";
import { Route, Routes } from "react-router";

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
        {/* <Route path={systemMenu?.accounts?.url} element={<PageAccounts />} />
        <Route path={systemMenu?.events?.url} element={<PageNotesList />} />
        <Route path={systemMenu?.events?.url} element={<PageEvents />} />
        <Route path={systemMenu?.pays?.url} element={<PagePays />} />
        <Route path={systemMenu?.settings?.url} element={<PageSettings />} /> */}
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
