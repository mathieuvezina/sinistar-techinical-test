import React from "react";
import "./App.css";
import { useAuthentification } from "./authentification/hooks/useAuthentification";

export const App = () => {
  const { user } = useAuthentification();

  return <div>{user ? <h1>Welcome</h1> : <h1>Not logged In</h1>}</div>;
};
