import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "@assets/scss/style.scss";
import { MyRouter } from "@/router";
import { ConfigProvider, App } from "antd";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "'Montserrat-Regular', serif",
            colorPrimaryBorder: "transparent",
            fontWeightStrong: 100,
          },
          components: {
            Tabs: {
              inkBarColor: "#7b7de5",
              itemActiveColor: "#7b7de5",
              itemHoverColor: "#7b7de5",
              itemSelectedColor: "#7b7de5",
            },
            Input: {
              activeBorderColor: "#7b7de5",
              hoverBorderColor: "#7b7de5",
            },
            Card: {
              bodyPadding: 15,
            }
          },
        }}
      >
        <App>
          <MyRouter />
        </App>
      </ConfigProvider>
    </BrowserRouter>
  </StrictMode>
);
