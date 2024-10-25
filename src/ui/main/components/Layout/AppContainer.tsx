import { Box } from "@mui/material";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export const AppContainer = ({ children }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        minHeight: "100vh",
        gap: "2em",
      }}
    >
      {children}
    </Box>
  );
};
