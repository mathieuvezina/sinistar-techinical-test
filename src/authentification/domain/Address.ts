import { Place } from "../../googleMaps/domain/Place";

export interface Address {
  place: Place;
  latitude: number;
  longitude: number;
}
