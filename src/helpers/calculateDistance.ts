import { LatLng } from "../googleMaps/domain/Place";

export const calculateDistance = (
  latLngStart: LatLng,
  latLngEnd: LatLng
): number => {
  const earthRadius = 6371; // Rayon de la Terre en kilomètres
  const radianLatitude = toRadians(latLngEnd.latitude - latLngStart.latitude);
  const radianLongitude = toRadians(
    latLngEnd.longitude - latLngStart.longitude
  );

  const halfChordLengthSquared =
    Math.sin(radianLatitude / 2) * Math.sin(radianLatitude / 2) +
    Math.cos(toRadians(latLngStart.latitude)) *
      Math.cos(toRadians(latLngEnd.latitude)) *
      Math.sin(radianLongitude / 2) *
      Math.sin(radianLongitude / 2);

  const angularDistance =
    2 *
    Math.atan2(
      Math.sqrt(halfChordLengthSquared),
      Math.sqrt(1 - halfChordLengthSquared)
    );

  return earthRadius * angularDistance;
};

const toRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};
