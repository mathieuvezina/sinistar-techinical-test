import { Card, CardContent, Typography } from "@mui/material";
import { HouseWithDistance } from "../../../../housingProvider/domain/HousingProvider";
import { useAuthentification } from "../../../../authentification/hooks/useAuthentification";
import { GoogleMap, Marker } from "@react-google-maps/api";

interface Props {
  houses: HouseWithDistance[];
}

export const MapCard = ({ houses }: Props) => {
  const { user } = useAuthentification();

  if (!user) {
    return null;
  }

  return (
    <Card sx={{ width: "100%", height: 400 }}>
      <CardContent>
        <Typography variant="h5">
          Carte des résidences ({houses.length})
        </Typography>
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "400px" }}
          center={{ lat: user.address.latitude, lng: user.address.longitude }}
          zoom={13}
        >
          <Marker
            key="ownn"
            position={{
              lat: user.address.latitude,
              lng: user.address.longitude,
            }}
          />
          {houses.map((house: HouseWithDistance) => {
            return (
              <Marker
                key={house.id}
                position={{
                  lat: house.latitude,
                  lng: house.longitude,
                }}
              />
            );
          })}
        </GoogleMap>
      </CardContent>
    </Card>
  );
};
