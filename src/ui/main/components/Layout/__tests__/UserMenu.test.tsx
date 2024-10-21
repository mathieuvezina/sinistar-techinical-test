import { render } from "../../../../../tests/wrapper";
import { UserMenu, UserMenuProps } from "../UserMenu";
import { screen } from "@testing-library/react";

test("given unauthenticate user it should render login menu", async () => {
  renderMenu();

  const loginButton = screen.getByText("Connexion");

  expect(loginButton).toBeInTheDocument();
});

test("given authenticate user it should render logout menu", () => {
  localStorage.setItem("user", JSON.stringify({ name: "John Doe" }));
  renderMenu();

  const logoutButton = screen.getByText("Déconnexion");

  expect(logoutButton).toBeInTheDocument();
});

const renderMenu = (props: Partial<UserMenuProps> = {}) => {
  const defaultProps: UserMenuProps = {
    anchor: null,
    close: jest.fn,
    login: jest.fn,
    ...props,
  };

  render(<UserMenu {...defaultProps} />);
};
