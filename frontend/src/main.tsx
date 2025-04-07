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
            fontFamily: "'Montserrat-Regular', serif",
          },
          components: {
            Layout: {
              headerBg: "#7B7DE5",
              bodyBg: "#F0F1F4",
              siderBg: "#484D5E",
            },
            Menu: {
              itemBg: "#484D5E",
              itemBorderRadius: 0,
              itemColor: "#8691B7",
              itemHoverBg: "#51576D",
              itemHoverColor: "#FFF",
              itemMarginBlock: 0,
              itemMarginInline: 0,
              itemSelectedBg: "#51576D",
              itemSelectedColor: "#FFF",
              popupBg: "#F00",
            },
          },
        }}
      >
        <MyRouter />
      </ConfigProvider>
    </BrowserRouter>
  </StrictMode>
);
