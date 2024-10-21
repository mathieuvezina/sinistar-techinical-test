import React from "react";
import { screen } from "@testing-library/react";
import { App } from "./App";
import { render } from "./tests/wrapper";

test("it should render properly", () => {
  renderApp();

  const title = screen.getByText("Bienvenue!");

  expect(title).toBeInTheDocument();
});

const renderApp = () => {
  render(<App />);
};
