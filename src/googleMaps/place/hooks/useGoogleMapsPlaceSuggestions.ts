import { useState } from "react";
import { GoogleMapsPlaceClient } from "../GoogleMapsPlaceClient";

interface GoogleMapsPlaceSuggestionsHook {
  suggestions: google.maps.places.AutocompletePrediction[];
  setSuggestions: (
    suggestions: google.maps.places.AutocompletePrediction[]
  ) => void;
  fetchSuggestions: (addressToSearch: string) => void;
}

export const useGoogleMapsPlaceSuggestions =
  (): GoogleMapsPlaceSuggestionsHook => {
    const [suggestions, setSuggestions] = useState<
      google.maps.places.AutocompletePrediction[]
    >([]);

    const fetchSuggestions = async (addressToSearch: string) => {
      const places = await GoogleMapsPlaceClient.fetchSuggestions(
        addressToSearch
      );

      setSuggestions(places as any);
    };

    return { suggestions, setSuggestions, fetchSuggestions };
  };
