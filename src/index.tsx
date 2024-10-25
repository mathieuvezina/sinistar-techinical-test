import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme/theme";
import { AuthentificationProvider } from "./authentification/context/AuthentificationContext";
import config from "./config/config";
import { LoadScript } from "@react-google-maps/api";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ThemeProvider theme={theme}>
    <AuthentificationProvider>
      <LoadScript googleMapsApiKey={config.GOOGLE_MAPS_KEY_API}>
        <CssBaseline />
        <App />
      </LoadScript>
    </AuthentificationProvider>
  </ThemeProvider>
);
