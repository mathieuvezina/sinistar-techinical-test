import { Box, TextField, Button } from "@mui/material";
import { useUserInformationForm } from "./hooks/useUserInformationForm";
import { AddressField } from "./AddressField";
import { Place } from "../../../../googleMaps/domain/Place";
import React from "react";

interface Props {
  submit: (name: string, place: Place) => void;
}

export const UserInformationForm = ({ submit }: Props) => {
  const { isFormValid, address, name, updateName, updateAddress } =
    useUserInformationForm();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (isFormValid && address !== null) {
      submit(name, address);
    }
  };

  const handlePlaceChange = (place: Place | null) => {
    updateAddress(place);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField
          autoComplete="off"
          label="Votre Nom"
          value={name}
          onChange={updateName}
        />

        <AddressField placeChange={handlePlaceChange} />

        <Button
          sx={{ ml: "auto" }}
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isFormValid}
        >
          Enregister
        </Button>
      </Box>
    </form>
  );
};
