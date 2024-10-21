import { createContext } from "react";
import { User } from "../domain/User";
import { useUser } from "../hooks/useUser";

export interface AuthentificationContextType {
  user: User | null;

  actions: {
    updateUser: (user: User) => void;
  };
}

export const AuthentificationContext =
  createContext<AuthentificationContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export const AuthentificationProvider = ({ children }: Props) => {
  const { user, updateUser } = useUser();

  return (
    <AuthentificationContext.Provider value={{ user, actions: { updateUser } }}>
      {children}
    </AuthentificationContext.Provider>
  );
};