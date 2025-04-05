import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./assets/css/normalize.css";
import { MyRouter } from "./router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <MyRouter />
    </BrowserRouter>
  </StrictMode>
);
