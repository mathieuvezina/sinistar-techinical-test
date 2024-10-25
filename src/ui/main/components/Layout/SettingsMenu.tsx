import { Settings } from "@mui/icons-material";
import {
  IconButton,
  Menu,
  MenuItem,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import { useHousingProvider } from "../../../../housingProvider/hooks/useHousingProvider";
import { useCallback, useState } from "react";
import { HousingProviderSearchCriteria } from "../../../../housingProvider/domain/SearchCriteria";
import { adjustWeightDistribution } from "../../../../housingProvider/helpers/criteriaHelpers";

const criteriaConfig = [
  { key: "distance" as const, label: "Distance" },
  { key: "hostResponseRate" as const, label: "Taux de réponse de l'hôte" },
  { key: "reviewScore" as const, label: "Score des avis" },
  { key: "extensionFlexibility" as const, label: "Flexibilité d'extension" },
];

export const SettingsMenu = () => {
  const { searchCriteria: searchCritiria, actions } = useHousingProvider();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSliderChange = useCallback(
    (key: keyof HousingProviderSearchCriteria) =>
      (event: Event, newValue: number | number[]) => {
        const value =
          typeof newValue === "number"
            ? Math.round(newValue)
            : Math.round(newValue[0]);
        const newCriteria = adjustWeightDistribution(
          key,
          value,
          searchCritiria
        );
        actions.updateSearchCriteriaWeighting(newCriteria);
      },
    [searchCritiria, actions]
  );

  const total = Object.values(searchCritiria).reduce((a, b) => a + b, 0);

  return (
    <>
      <IconButton
        size="large"
        aria-label="Settings"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="inherit"
        onClick={handleClick}
      >
        <Settings />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { width: 420, maxWidth: "100%", p: 2 },
        }}
      >
        <Typography variant="h6" sx={{ px: 2, pb: 2 }}>
          Pondération des critères de recherche
        </Typography>

        {criteriaConfig.map(({ key, label }) => (
          <MenuItem
            key={key}
            sx={{ flexDirection: "column", alignItems: "stretch" }}
          >
            <Stack spacing={1} sx={{ width: "100%" }}>
              <Typography>
                {label}: {searchCritiria[key]}%
              </Typography>
              <Slider
                value={searchCritiria[key]}
                onChange={handleSliderChange(key)}
                aria-labelledby={`${key}-slider`}
                valueLabelDisplay="auto"
                step={1}
                min={0}
                max={100}
                sx={{ mx: 1 }}
              />
            </Stack>
          </MenuItem>
        ))}

        <Typography
          variant="caption"
          sx={{
            px: 2,
            pt: 2,
            display: "block",
            color: "text.secondary",
          }}
        >
          Total: {total}%
        </Typography>
      </Menu>
    </>
  );
};
