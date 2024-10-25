import { render } from "../../../../../tests/wrapper";
import { AppContainer } from "../AppContainer";
import { screen } from "@testing-library/react";

test("it should render properly", () => {
  render(<AppContainer>test</AppContainer>);

  const children = screen.getByText("test");

  expect(children).toBeInTheDocument();
});
