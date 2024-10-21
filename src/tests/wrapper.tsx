import { render } from "@testing-library/react";
import { AuthentificationProvider } from "../authentification/context/AuthentificationContext";

const customRender = (ui: React.ReactElement) => {
  return render(<AuthentificationProvider>{ui}</AuthentificationProvider>);
};

export { customRender as render };
