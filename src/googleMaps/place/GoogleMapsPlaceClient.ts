type AutocompleteServiceType = google.maps.places.AutocompleteService | null;

const autocompleteService: {
  instance: AutocompleteServiceType;
} = { instance: null };

const AutocompleteService = (): google.maps.places.AutocompleteService => {
  if (!autocompleteService.instance) {
    autocompleteService.instance = new google.maps.places.AutocompleteService();
  }

  return autocompleteService.instance;
};

export const GoogleMapsPlaceClient = {
  fetchSuggestions: async (
    query: string
  ): Promise<google.maps.places.AutocompletePrediction[]> => {
    await google.maps.importLibrary("places");

    if (query === "") {
      return [];
    }

    const response = await AutocompleteService().getPlacePredictions({
      input: query,
    });

    return response.predictions;
  },
};
