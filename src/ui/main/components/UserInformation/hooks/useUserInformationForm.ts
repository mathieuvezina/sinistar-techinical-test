import { useState } from "react";

export const useUserInformationForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const updateName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const updateAddress = (address?: string | null) => {
    setAddress(address ?? "");
  };

  const checkFormState = () => {
    setIsFormValid(name !== "" && address !== "");
  };

  return {
    address,
    isFormValid,
    name,
    updateAddress,
    updateName,
  };
};
