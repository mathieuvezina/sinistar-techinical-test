import { Box, Typography } from "@mui/material";
import { useHousingProvider } from "../../../../housingProvider/hooks/useHousingProvider";
import { HouseItem } from "./HouseItem";

export const HousingProvider = () => {
  const { houses } = useHousingProvider();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
      }}
    >
      <Typography variant="h3">
        Résidences ({houses.length} trouvées)
      </Typography>
      <ul>
        {houses.map((house) => (
          <HouseItem house={house} />
        ))}
      </ul>
    </Box>
  );
};
