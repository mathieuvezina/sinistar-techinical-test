import { createContext } from "react";
import { House } from "../domain/HousingProvider";
import { HousingProviderSearchCriteria } from "../domain/SearchCriteria";
import { HousingProviderClient } from "../HousingProviderClient";

export interface HousingProviderContextType {
  searchCritiria: HousingProviderSearchCriteria;
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

export const HousingProviderProvider = ({ children }: Props) => {
  const houses: House[] = HousingProviderClient.list();
  const searchCritiria: HousingProviderSearchCriteria = {
    distance: 25,
    hostResponseRate: 25,
    reviewScore: 25,
    extensionFlexibility: 25,
  };

  const updateSearchCriteriaWeighting = (sc: HousingProviderSearchCriteria) => {
    searchCritiria.distance = sc.distance;
    searchCritiria.hostResponseRate = sc.hostResponseRate;
    searchCritiria.reviewScore = sc.reviewScore;
    searchCritiria.extensionFlexibility = sc.extensionFlexibility;
  };

  return (
    <HousingProviderContext.Provider
      value={{
        houses,
        searchCritiria,
        actions: { updateSearchCriteriaWeighting },
      }}
    >
      {children}
    </HousingProviderContext.Provider>
  );
};
