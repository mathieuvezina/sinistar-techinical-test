import { useContext } from "react";
import {
  AuthentificationContext,
  AuthentificationContextType,
} from "../context/AuthentificationContext";

type AuthentificationState = AuthentificationContextType;

export const useAuthentification = (): AuthentificationState => {
  const context = useContext(AuthentificationContext);

  if (!context) {
    throw new Error("Cannot use authentification outside of its provider");
  }

  return context;
};
