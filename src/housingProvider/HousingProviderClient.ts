import { LatLng } from "../googleMaps/domain/Place";
import { HousingProviderAssembler } from "./assembler/HousingProviderAssembler";
import { House, HouseWithDistance } from "./domain/HousingProvider";
import { HousingProviderRepository } from "./HousingProviderRepository";

export const HousingProviderClient = {
  list: (): House[] => {
    return HousingProviderRepository.list();
  },
  listWithDistanceFromStartPoint: (startPoint: LatLng): HouseWithDistance[] => {
    const houses = HousingProviderRepository.list();
    return HousingProviderAssembler.fromHousesAndStartPoint(houses, startPoint);
  },
};
