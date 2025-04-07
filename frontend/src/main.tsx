import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "@assets/scss/style.scss";
import { MyRouter } from "@/router";
import { ConfigProvider } from "antd";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: '"Montserrat-Regular", serif',
          },
          components: {
            Layout: {
              headerBg: "#484D5E",
              bodyBg: "#FAFBFE",
            },
            Menu: {
              darkItemBg: "#484D5E",
              darkItemSelectedBg: "#51576D",
              horizontalItemHoverBg: "#51576D",
              darkItemColor: "#8691B7",
            },
          },
        }}
      >
        <MyRouter />
      </ConfigProvider>
    </BrowserRouter>
  </StrictMode>
);
