import { createContext } from "react";
import { User } from "../domain/User";
import { useUser } from "../hooks/useUser";
import { Place } from "../../googleMaps/domain/Place";

export interface AuthentificationContextType {
  user: User | null;

  actions: {
    updateUser: (name: string, place: Place) => void;
    deleteUser: () => void;
  };
}

export const AuthentificationContext =
  createContext<AuthentificationContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export const AuthentificationProvider = ({ children }: Props) => {
  const { user, deleteUser, updateUser } = useUser();

  return (
    <AuthentificationContext.Provider
      value={{ user, actions: { deleteUser, updateUser } }}
    >
      {children}
    </AuthentificationContext.Provider>
  );
};
