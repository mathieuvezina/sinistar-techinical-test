import { useState } from "react";
import { Place } from "../../domain/Place";
import { GoogleMapsPlaceClient } from "../GoogleMapsPlaceClient";

interface GoogleMapsPlaceSuggestionsHook {
  suggestions: Place[];
  fetchSuggestions: (address: string) => void;
}

export const useGoogleMapsPlaceSuggestions =
  (): GoogleMapsPlaceSuggestionsHook => {
    const [suggestions, setSuggestions] = useState<Place[]>([]);

    const fetchSuggestions = async (address: string) => {
      try {
        const places = await GoogleMapsPlaceClient.fetchSuggestions(address);
        setSuggestions(places);
      } catch (_) {
        setSuggestions([]);
      }
    };

    return { suggestions, fetchSuggestions };
  };
