import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./app/app";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "@/entities/store";
import './variables.scss'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={{ token: { colorPrimary: "#1677ff" } }}>
        <App />
      </ConfigProvider>
    </Provider>
  </StrictMode>
);
