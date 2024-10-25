import { LatLng, Place } from "../domain/Place";

type AutocompleteServiceType = google.maps.places.AutocompleteService | null;
type PlaceServiceType = google.maps.places.PlacesService | null;
interface GoogleMapsPlaceServicesType {
  AutocompleteService: {
    instance: AutocompleteServiceType;
  };
  PlacesService: {
    instance: PlaceServiceType;
  };
}

const GoogleMapsPlaceServicesInstance: GoogleMapsPlaceServicesType = {
  AutocompleteService: {
    instance: null,
  },
  PlacesService: {
    instance: null,
  },
};

const GoogleMapsPlaceServices = {
  AutocompleteService: () => {
    if (!GoogleMapsPlaceServicesInstance.AutocompleteService.instance) {
      GoogleMapsPlaceServicesInstance.AutocompleteService.instance =
        new google.maps.places.AutocompleteService();
    }

    return GoogleMapsPlaceServicesInstance.AutocompleteService.instance;
  },
  PlacesService: () => {
    if (!GoogleMapsPlaceServicesInstance.PlacesService.instance) {
      GoogleMapsPlaceServicesInstance.PlacesService.instance =
        new google.maps.places.PlacesService(document.createElement("div"));
    }

    return GoogleMapsPlaceServicesInstance.PlacesService.instance;
  },
};

export const GoogleMapsPlaceClient = {
  fetchSuggestions: async (query: string): Promise<Place[]> => {
    await google.maps.importLibrary("places");

    if (query === "") {
      return [];
    }

    const response =
      await GoogleMapsPlaceServices.AutocompleteService().getPlacePredictions({
        input: query,
      });

    return response.predictions;
  },
  getLatLngFromPlaceId: async (placeId: string): Promise<LatLng> => {
    await google.maps.importLibrary("places");

    return new Promise((resolve, reject) => {
      GoogleMapsPlaceServices.PlacesService().getDetails(
        { placeId, fields: ["geometry"] },
        (
          place: google.maps.places.PlaceResult | null,
          status: google.maps.places.PlacesServiceStatus
        ) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            place !== null &&
            place.geometry &&
            place.geometry.location
          ) {
            resolve({
              latitude: place.geometry.location.lat(),
              longitude: place.geometry.location.lng(),
            });
          } else {
            reject(new Error("Failed to get place details"));
          }
        }
      );
    });
  },
};
