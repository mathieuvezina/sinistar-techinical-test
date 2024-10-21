import config from "../../config/config";
import { Place } from "../domain/Place";

const baseUrl = "https://maps.googleapis.com/maps/api/place/autocomplete/json";

export const GoogleMapsPlaceClient = {
  fetchSuggestions: async (address: string): Promise<Place[]> => {
    const encodedAddress = encodeURIComponent(address);
    const suggestions: Place[] = [];

    try {
      const response = await fetch(
        `${baseUrl}?input=${encodedAddress}&key=${config.GOOGLE_MAPS_KEY_API}`
      );

      const data = await response.json();
      if (data.status === "OK") {
        console.log(data);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      return suggestions;
    }
  },
};
