import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme/theme";
import { AuthentificationProvider } from "./authentification/context/AuthentificationContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ThemeProvider theme={theme}>
    <AuthentificationProvider>
      <CssBaseline />
      <App />
    </AuthentificationProvider>
  </ThemeProvider>
);
