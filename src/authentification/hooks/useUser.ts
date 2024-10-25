import { useState, useEffect } from "react";
import { User } from "../domain/User";
import { LatLng, Place } from "../../googleMaps/domain/Place";
import { GoogleMapsPlaceClient } from "../../googleMaps/place/GoogleMapsPlaceClient";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, []);

  const updateUser = async (name: string, place: Place) => {
    let latLng: LatLng = {
      latitude: 0,
      longitude: 0,
    };

    try {
      const latLngFromPlace = await GoogleMapsPlaceClient.getLatLngFromPlaceId(
        place.place_id
      );

      latLng = {
        latitude: latLngFromPlace.latitude,
        longitude: latLngFromPlace.longitude,
      };
    } catch (_) {}

    const user: User = {
      name,
      address: {
        place,
        latitude: latLng.latitude,
        longitude: latLng.longitude,
      },
    };

    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const deleteUser = () => {
    setUser(null);
    localStorage.setItem("user", JSON.stringify(null));
  };

  return { user, deleteUser, updateUser };
};
