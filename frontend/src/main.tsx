import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import { MyRouter } from "@/router";

import { ConfigProvider, App } from "antd";

import "normalize.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ConfigProvider
      theme={{
        token: {},
        components: {
          Form: { itemMarginBottom: 8 },
          Layout: {},
        },
      }}
    >
      <App>
        <MyRouter />
      </App>
    </ConfigProvider>
  </BrowserRouter>,
);
