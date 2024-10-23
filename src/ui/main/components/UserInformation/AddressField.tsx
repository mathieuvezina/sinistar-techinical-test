import { TextField, Autocomplete, debounce } from "@mui/material";
import React from "react";
import { useGoogleMapsPlaceSuggestions } from "../../../../googleMaps/place/hooks/useGoogleMapsPlaceSuggestions";

export const AddressField = () => {
  const [value, setValue] =
    React.useState<google.maps.places.AutocompletePrediction | null>(null);
  const { suggestions, setSuggestions, fetchSuggestions } =
    useGoogleMapsPlaceSuggestions();

  const handleValueChange = React.useMemo(
    () =>
      debounce(
        (_: React.SyntheticEvent<Element, Event>, inputValue: string) => {
          fetchSuggestions(inputValue);
        }
      ),
    [fetchSuggestions]
  );

  return (
    <Autocomplete
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.description
      }
      filterOptions={(x) => x}
      options={suggestions}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText="Aucune adresse"
      onChange={(
        event: any,
        newValue: google.maps.places.AutocompletePrediction | null
      ) => {
        setSuggestions(newValue ? [newValue, ...suggestions] : suggestions);
        setValue(newValue);
      }}
      onInputChange={handleValueChange}
      renderInput={(params) => (
        <TextField {...params} label="Votre adresse" variant="outlined" />
      )}
    ></Autocomplete>
  );
};
