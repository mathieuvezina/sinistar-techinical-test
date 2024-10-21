import React from "react";
import { render, screen } from "@testing-library/react";
import { App } from "./App";
import { AuthentificationProvider } from "./authentification/context/AuthentificationContext";

test("given unauthenticated user it should return not logged in", () => {
  renderApp();

  const title = screen.getByText("Not logged In");

  expect(title).toBeInTheDocument();
});

test("given authenticated user it should return Welcome", () => {
  localStorage.setItem("user", JSON.stringify({ name: "John Doe" }));

  renderApp();

  const title = screen.getByText("Welcome");

  expect(title).toBeInTheDocument();
});

const renderApp = () => {
  render(
    <AuthentificationProvider>
      <App />
    </AuthentificationProvider>
  );
};
