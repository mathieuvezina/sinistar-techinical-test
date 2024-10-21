import { IconButton, Toolbar, Typography } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import React, { useState } from "react";
import Settings from "@mui/icons-material/Settings";
import { UserMenu } from "./UserMenu";

interface Props {
  login: () => void;
}

export const ToolbarContainer = ({ login }: Props) => {
  const [anchorUserMenuEl, setAnchorUserMenuEl] =
    useState<HTMLButtonElement | null>(null);

  const handleUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorUserMenuEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorUserMenuEl(null);
  };

  return (
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Sinistar
      </Typography>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="inherit"
        onClick={handleUserMenu}
      >
        <AccountCircle />
      </IconButton>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="inherit"
      >
        <Settings />
      </IconButton>
      <UserMenu
        login={login}
        anchor={anchorUserMenuEl}
        close={handleCloseUserMenu}
      />
       
    </Toolbar>
  );
};
