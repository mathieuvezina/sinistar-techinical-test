import { Modal, Box, Typography } from "@mui/material";
import { UserInformationForm } from "./UserInformationForm";

interface Props {
  open: boolean;
  close: () => void;
}

export const UserInformationModal = ({ close, open }: Props) => {
  const handleClose = () => {
    close();
  };

  const handleSaveUserInformation = () => {
    close();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          gap: 2,
        }}
      >
        <Typography variant="h6">Bienvenue !</Typography>
        <Typography variant="body1">
          Veuillez saisir votre nom ainsi que votre adresse. Ceci nous
          permettera de vous trouver la meilleure résidence pour vous loger
        </Typography>
        <UserInformationForm close={handleSaveUserInformation} />
      </Box>
    </Modal>
  );
};
