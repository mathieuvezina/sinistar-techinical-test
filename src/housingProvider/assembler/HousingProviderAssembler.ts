import { LatLng } from "../../googleMaps/domain/Place";
import { calculateDistance } from "../../helpers/calculateDistance";
import { House, HouseWithDistance } from "../domain/HousingProvider";

export const HousingProviderAssembler = {
  fromHouseAndStartPoint: (
    house: House,
    startPoint: LatLng
  ): HouseWithDistance => {
    const endPoint: LatLng = {
      latitude: house.latitude,
      longitude: house.longitude,
    };
    return {
      ...house,
      distance: calculateDistance(startPoint, endPoint),
    };
  },
  fromHousesAndStartPoint: (
    houses: House[],
    startPoint: LatLng
  ): HouseWithDistance[] => {
    return houses.map((house: House) =>
      HousingProviderAssembler.fromHouseAndStartPoint(house, startPoint)
    );
  },
};
