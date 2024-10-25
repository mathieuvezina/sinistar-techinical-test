import { IconButton, Menu, MenuItem } from "@mui/material";
import { useAuthentification } from "../../../../authentification/hooks/useAuthentification";
import { useState } from "react";
import { AccountCircle } from "@mui/icons-material";

export interface UserMenuProps {
  login: () => void;
}

export const UserMenu = ({ login }: UserMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const { user, actions } = useAuthentification();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    actions.deleteUser();
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="inherit"
        onClick={handleClick}
      >
        <AccountCircle />
      </IconButton>

      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
      >
        {user ? (
          <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
        ) : (
          <MenuItem onClick={login}>Connexion</MenuItem>
        )}
      </Menu>
    </>
  );
};
