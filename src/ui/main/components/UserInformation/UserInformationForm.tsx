import { Box, TextField, Button } from "@mui/material";
import { useUserInformationForm } from "./hooks/useUserInformationForm";
import { AddressField } from "./AddressField";

interface Props {
  close: () => void;
}

export const UserInformationForm = ({ close }: Props) => {
  const { isFormValid, name, updateName } = useUserInformationForm();

  const handleSubmit = () => {
    close();
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
        <TextField label="Votre Nom" value={name} onChange={updateName} />

        <AddressField />

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
