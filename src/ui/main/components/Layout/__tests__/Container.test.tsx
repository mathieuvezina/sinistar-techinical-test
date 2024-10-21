import { render } from "../../../../../tests/wrapper";
import { Container } from "../Container";
import { screen } from "@testing-library/react";

test("it should render properly", () => {
  render(<Container>test</Container>);

  const children = screen.getByText("test");

  expect(children).toBeInTheDocument();
});
