import { FC } from "react";
import { Routes, Route } from "react-router";

import { PageUi } from "../pages/PageUi/PageUi";

export const MyRouter: FC = () => {
  return (
    <Routes>
      <Route path="" element={<PageUi />} />
    </Routes>
  );
};
