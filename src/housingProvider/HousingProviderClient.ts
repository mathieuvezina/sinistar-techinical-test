import { HousingProviderRepository } from "./HousingProviderRepository";

export const HousingProviderClient = {
  list: () => {
    return HousingProviderRepository.list();
  },
};
