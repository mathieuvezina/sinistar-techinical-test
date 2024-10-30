import { createContext, useEffect, useState } from "react";
import { HouseWithDistance } from "../domain/HousingProvider";
import { HousingProviderSearchCriteria } from "../domain/SearchCriteria";
import { HousingProviderClient } from "../HousingProviderClient";
import { useAuthentification } from "../../authentification/hooks/useAuthentification";
import { HousingProviderSorter } from "../sorter/HousingProviderSorter";
import { debounce } from "@mui/material";

export interface HousingProviderContextType {
  searchCriteria: HousingProviderSearchCriteria;
  houses: HouseWithDistance[];

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
  const { user } = useAuthentification();
  const [searchCriteria, setSearchCriteria] =
    useState<HousingProviderSearchCriteria>(defaultSearchCriteria);
  const [houses, setHouses] = useState<HouseWithDistance[]>([]);

  useEffect(() => {
    if (user) {
      const { latitude, longitude } = user.address;
      const houses = HousingProviderClient.listWithDistanceFromStartPoint({
        latitude,
        longitude,
      });

      updateHouses(houses, searchCriteria);
    }
  }, [user]);

  const updateSearchCriteriaWeighting = (
    searchCriteria: HousingProviderSearchCriteria
  ) => {
    setSearchCriteria(searchCriteria);
    updateHouses(houses, searchCriteria);
  };

  const updateHouses = (
    houses: HouseWithDistance[],
    searchCriteria: HousingProviderSearchCriteria
  ) => {
    const sortedHouses = HousingProviderSorter.sortHousesBySearchCriteria(
      houses,
      searchCriteria
    );

    setHouses(sortedHouses);
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
