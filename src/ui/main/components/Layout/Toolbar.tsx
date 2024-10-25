import { Toolbar, Typography } from "@mui/material";
import { UserMenu } from "./UserMenu";
import { SettingsMenu } from "./SettingsMenu";

interface Props {
  login: () => void;
}

export const ToolbarContainer = ({ login }: Props) => {
  return (
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Sinistar
      </Typography>
      <UserMenu login={login} />
      <SettingsMenu /> 
    </Toolbar>
  );
};
