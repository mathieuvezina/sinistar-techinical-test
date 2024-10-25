import { createContext, useState } from "react";
import { House } from "../domain/HousingProvider";
import { HousingProviderSearchCriteria } from "../domain/SearchCriteria";
import { HousingProviderClient } from "../HousingProviderClient";

export interface HousingProviderContextType {
  searchCriteria: HousingProviderSearchCriteria;
  houses: House[];

  actions: {
    updateSearchCriteriaWeighting: (
      searchCriteria: HousingProviderSearchCriteria
    ) => void;
  };
}

export const HousingProviderContext =
  createContext<HousingProviderContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

const defaultSearchCriteria: HousingProviderSearchCriteria = {
  distance: 25,
  hostResponseRate: 25,
  reviewScore: 25,
  extensionFlexibility: 25,
};

export const HousingProviderProvider = ({ children }: Props) => {
  const [searchCriteria, setSearchCriteria] =
    useState<HousingProviderSearchCriteria>(defaultSearchCriteria);
  const houses: House[] = HousingProviderClient.list();

  const updateSearchCriteriaWeighting = (
    searchCritiria: HousingProviderSearchCriteria
  ) => {
    setSearchCriteria(searchCritiria);
  };

  return (
    <HousingProviderContext.Provider
      value={{
        houses,
        searchCriteria,
        actions: { updateSearchCriteriaWeighting },
      }}
    >
      {children}
    </HousingProviderContext.Provider>
  );
};
