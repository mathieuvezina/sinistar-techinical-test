import { useContext } from "react";
import { HousingProviderContext } from "../context/HousingProviderContext";

export const useHousingProvider = () => {
  const context = useContext(HousingProviderContext);

  if (!context) {
    throw new Error("Cannot use housing provider outside of its provider");
  }

  return context;
};
