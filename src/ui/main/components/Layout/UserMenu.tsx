import { Menu, MenuItem } from "@mui/material";
import { useAuthentification } from "../../../../authentification/hooks/useAuthentification";

export interface UserMenuProps {
  anchor: HTMLButtonElement | null;
  close: () => void;
  login: () => void;
}

export const UserMenu = ({ anchor, close, login }: UserMenuProps) => {
  const { user, actions } = useAuthentification();
  const open = Boolean(anchor);

  const handleClose = () => {
    close();
  };

  const handleLogout = () => {
    actions.deleteUser();
  };

  return (
    <Menu
      id="menu-appbar"
      anchorEl={anchor}
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
  );
};
