import { AppBar, Typography } from "@mui/material";
import { useAuthentification } from "../../authentification/hooks/useAuthentification";
import { Container } from "./components/Layout/Container";
import { useState } from "react";
import { ToolbarContainer } from "./components/Layout/Toolbar";
import { UserInformationModal } from "./components/UserInformation/UserInformationModal";

export const Layout = () => {
  const [isUserInformationModalOpen, setIsUserInformationModalOpen] =
    useState<boolean>(false);
  const { user } = useAuthentification();

  const handleCloseUserInformationModal = () => {
    setIsUserInformationModalOpen(false);
  };

  const handleLogin = () => {
    setIsUserInformationModalOpen(true);
  };

  const shouldOpenningUserInformationModal =
    user === null || isUserInformationModalOpen;

  return (
    <Container>
      <AppBar position="static">
        <ToolbarContainer login={handleLogin} />
      </AppBar>
      <Typography sx={{ mt: "1em" }} variant="h2">
        Bienvenue!
      </Typography>

      <UserInformationModal
        open={shouldOpenningUserInformationModal}
        close={handleCloseUserInformationModal}
      />
    </Container>
  );
};
