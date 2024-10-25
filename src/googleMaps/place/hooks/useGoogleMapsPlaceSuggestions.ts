import { useState } from "react";
import { GoogleMapsPlaceClient } from "../GoogleMapsPlaceClient";
import { Place } from "../../domain/Place";

interface GoogleMapsPlaceSuggestionsHook {
  suggestions: Place[];
  setSuggestions: (suggestions: Place[]) => void;
  fetchSuggestions: (addressToSearch: string) => void;
}

export const useGoogleMapsPlaceSuggestions =
  (): GoogleMapsPlaceSuggestionsHook => {
    const [suggestions, setSuggestions] = useState<Place[]>([]);

    const fetchSuggestions = async (addressToSearch: string) => {
      const places = await GoogleMapsPlaceClient.fetchSuggestions(
        addressToSearch
      );

      setSuggestions(places as any);
    };

    return { suggestions, setSuggestions, fetchSuggestions };
  };
