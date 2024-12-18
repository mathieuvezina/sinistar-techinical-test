import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// A custom theme for this app
const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: "#edcc1f",
    },
    secondary: {
      main: "#b0b0b0",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
