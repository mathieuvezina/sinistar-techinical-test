import { useState, useEffect } from "react";
import { User } from "../domain/User";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, []);

  const updateUser = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  return { user, updateUser };
};
