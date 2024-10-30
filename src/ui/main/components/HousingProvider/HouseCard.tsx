import { Card, CardContent, Typography, Link, Stack } from "@mui/material";
import { HouseWithDistance } from "../../../../housingProvider/domain/HousingProvider";

interface Props {
  house: HouseWithDistance;
  onOpenMap: (latitude: number, longitude: number) => void;
}

export const HouseCard = ({ house, onOpenMap }: Props) => {
  const { name, address, city, distance, latitude, longitude } = house;

  const handleOpenMap = () => {
    onOpenMap(latitude, longitude);
  };

  return (
    <Card sx={{ maxWidth: 345, mb: 2, backgroundColor: "#eee" }}>
      <CardContent>
        <Typography sx={{ mb: 2 }} variant="h5" component="div">
          {name}
        </Typography>
        <Stack direction="column" spacing={1}>
          <Typography variant="body2">
            {address}, {city}
          </Typography>
          <Typography variant="body2">
            Distance: {distance.toFixed(2)} km
          </Typography>
          <Link
            color="textSecondary"
            variant="body1"
            href="#"
            onClick={handleOpenMap}
          >
            Directions
          </Link>
        </Stack>
      </CardContent>
    </Card>
  );
};
