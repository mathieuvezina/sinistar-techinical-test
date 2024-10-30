import { Box, Typography } from "@mui/material";
import { useHousingProvider } from "../../../../housingProvider/hooks/useHousingProvider";
import { HouseCard } from "./HouseCard";
import { useAuthentification } from "../../../../authentification/hooks/useAuthentification";
import { MapCard } from "./MapCard";

export const HousingProvider = () => {
  const { houses } = useHousingProvider();
  const { user } = useAuthentification();

  const handleOpenMap = (latitude: number, longitude: number) => {
    let link = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    if (user) {
      link += `&origin=${user.address.latitude},${user.address.longitude}`;
    }

    window.open(link, "_blank");
  };

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
      <MapCard houses={houses} />
      <Box
        display="flex"
        flexDirection="row"
        flexWrap={"wrap"}
        alignItems="center"
        gap={4}
        mt={4}
      >
        {houses.map((house) => (
          <HouseCard key={house.id} house={house} onOpenMap={handleOpenMap} />
        ))}
      </Box>
    </Box>
  );
};
