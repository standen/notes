import { FC } from "react";
import { Routes, Route } from "react-router";

import { PageTemplate, PageAccount } from "@/pages";

export const MyRouter: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PageTemplate />}>
        <Route path="accounts" element={<PageAccount />} />
      </Route>
    </Routes>
  );
};
