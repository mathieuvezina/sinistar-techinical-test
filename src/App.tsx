import React from "react";
import "./App.css";
import { Layout } from "./ui/main/Layout";
import { useLoadScript } from "@react-google-maps/api";
import config from "./config/config";

export const App = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: config.GOOGLE_MAPS_KEY_API,
  });

  if (!isLoaded) {
    return null;
  }

  return <Layout />;
};
