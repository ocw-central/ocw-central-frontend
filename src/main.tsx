import "@/styles/index.css";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./i18n";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback="ロード中">
      <App />
    </Suspense>
  </React.StrictMode>
);
