import { HouseWithDistance } from "../domain/HousingProvider";
import { HousingProviderSearchCriteria } from "../domain/SearchCriteria";

export const HousingProviderSorter = {
  sortHousesBySearchCriteria: (
    houses: HouseWithDistance[],
    searchCriteria: HousingProviderSearchCriteria
  ): HouseWithDistance[] => {
    return houses.sort((a, b) => {
      const aScore = calculateSearchScore(a, searchCriteria);
      const bScore = calculateSearchScore(b, searchCriteria);
      return bScore - aScore;
    });
  },
};

const calculateSearchScore = (
  house: HouseWithDistance,
  searchCriteria: HousingProviderSearchCriteria
): number => {
  const { distance, hostResponseRate, reviewScore, extensionFlexibility } =
    searchCriteria;
  let score = 0;

  // Distance score
  score += distance - house.distance * (distance / 100);

  // Host response rate score
  score += house.host_response_rate * (hostResponseRate / 100);

  // Review score
  score += (house.review_score / 5) * (reviewScore / 100);

  // Extension flexibility score
  score += house.extension_flexibility * (extensionFlexibility / 100);

  return Math.round(score);
};
