import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { LocaleProvider } from "./lib/i18n.tsx";
import { ThemeProvider } from "./lib/theme.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <LocaleProvider>
        <App />
      </LocaleProvider>
    </ThemeProvider>
  </React.StrictMode>
);
