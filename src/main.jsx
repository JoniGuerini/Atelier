import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { LocaleProvider } from "./lib/i18n.jsx";
import { ThemeProvider } from "./lib/theme.jsx";
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
