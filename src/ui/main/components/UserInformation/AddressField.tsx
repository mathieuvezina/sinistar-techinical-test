import { TextField, Autocomplete, Skeleton } from "@mui/material";
import { useGoogleMapsPlaceSuggestions } from "../../../../googleMaps/place/hooks/useGoogleMapsPlaceSuggestions";
import { useLoadScript } from "@react-google-maps/api";
import config from "../../../../config/config";

export const AddressField = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: config.GOOGLE_MAPS_KEY_API,
    libraries: ["places"],
  });
  const { suggestions, fetchSuggestions } = useGoogleMapsPlaceSuggestions();

  if (!isLoaded) {
    return <Skeleton animation="wave" variant="rectangular" height={58} />;
  }

  return (
    <Autocomplete
      options={suggestions}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Votre Adresse"
          variant="outlined"
          onChange={(event) => fetchSuggestions(event.target.value)}
        />
      )}
    ></Autocomplete>
  );
};
