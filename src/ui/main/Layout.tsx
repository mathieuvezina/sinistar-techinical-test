import { AppBar, Container, Typography } from "@mui/material";
import { useAuthentification } from "../../authentification/hooks/useAuthentification";
import { AppContainer } from "./components/Layout/AppContainer";
import { useState } from "react";
import { ToolbarContainer } from "./components/Layout/Toolbar";
import { UserInformationModal } from "./components/UserInformation/UserInformationModal";
import { HousingProviderProvider } from "../../housingProvider/context/HousingProviderContext";
import { HousingProvider } from "./components/HousingProvider/HousingProvider";

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
    <HousingProviderProvider>
      <AppContainer>
        <AppBar position="static">
          <ToolbarContainer login={handleLogin} />
        </AppBar>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "3em",
          }}
        >
          <Typography variant="h2">Bienvenue!</Typography>
          {user && <HousingProvider />}
        </Container>
        <UserInformationModal
          open={shouldOpenningUserInformationModal}
          close={handleCloseUserInformationModal}
        />
      </AppContainer>
    </HousingProviderProvider>
  );
};
