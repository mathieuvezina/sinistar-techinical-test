import { TextField, Autocomplete, debounce } from "@mui/material";
import React from "react";
import { useGoogleMapsPlaceSuggestions } from "../../../../googleMaps/place/hooks/useGoogleMapsPlaceSuggestions";
import { Place } from "../../../../googleMaps/domain/Place";

interface Props {
  placeChange: (place: Place | null) => void;
}

export const AddressField = ({ placeChange }: Props) => {
  const [value, setValue] = React.useState<Place | null>(null);
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

  const handleSelectPlace = (_: React.SyntheticEvent, place: Place | null) => {
    setSuggestions(place ? [place, ...suggestions] : suggestions);
    setValue(place);
    placeChange(place);
  };

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
      onChange={handleSelectPlace}
      onInputChange={handleValueChange}
      renderInput={(params) => (
        <TextField {...params} label="Votre adresse" variant="outlined" />
      )}
    ></Autocomplete>
  );
};
