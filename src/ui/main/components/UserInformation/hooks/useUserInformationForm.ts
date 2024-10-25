import { useState } from "react";
import { Place } from "../../../../../googleMaps/domain/Place";

export const useUserInformationForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState<Place | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const updateName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    checkFormState(event.target.value, address);
  };

  const updateAddress = (place: Place | null) => {
    setAddress(place);
    checkFormState(name, place);
  };

  const checkFormState = (name: string, place: Place | null) => {
    setIsFormValid(name !== "" && place !== null);
  };

  return {
    address,
    isFormValid,
    name,
    updateAddress,
    updateName,
  };
};
