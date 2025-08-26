import { Route, Routes } from "react-router";

import { ViewMain } from "@/views";
import { PageSettings, PageNotes } from "@/pages";

export const MyRouter = () => {
  return (
    <Routes>
      <Route path="" element={<ViewMain />}>
        <Route path="/" element={<PageSettings />} />
        <Route path="/notes" element={<PageNotes />} />
      </Route>

      <Route path="*" element={<>404: страница не существует</>} />
    </Routes>
  );
};
