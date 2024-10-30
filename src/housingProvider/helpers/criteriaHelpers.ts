import { HousingProviderSearchCriteria } from "../domain/SearchCriteria";

export const adjustWeightDistributionOnHundred = (
  changedKey: keyof HousingProviderSearchCriteria,
  newValue: number,
  currentCriteria: HousingProviderSearchCriteria
): HousingProviderSearchCriteria => {
  const oldValue = currentCriteria[changedKey];
  const difference = newValue - oldValue;

  // If trying to decrease below 0 or increase above 100, prevent the change
  if (newValue < 0 || newValue > 100) return currentCriteria;

  const otherKeys = Object.keys(currentCriteria).filter(
    (key) => key !== changedKey
  ) as Array<keyof HousingProviderSearchCriteria>;

  // Calculate total of other values
  const otherTotal = otherKeys.reduce(
    (sum, key) => sum + currentCriteria[key],
    0
  );

  if (otherTotal - difference < 0) return currentCriteria;

  const newCriteria = { ...currentCriteria };
  newCriteria[changedKey] = Math.round(newValue);

  // First, distribute the difference proportionally and round down
  let remainingDifference = difference;
  const adjustments = otherKeys.map((key) => {
    const proportion = currentCriteria[key] / otherTotal;
    const adjustment = Math.floor(difference * proportion);
    remainingDifference -= adjustment;
    return { key, adjustment };
  });

  // Apply the main adjustments
  adjustments.forEach(({ key, adjustment }) => {
    newCriteria[key] = Math.max(0, currentCriteria[key] - adjustment);
  });

  // Distribute any remaining difference one point at a time to the highest values
  if (remainingDifference > 0) {
    distributeRemainingPoints(
      newCriteria,
      otherKeys,
      remainingDifference,
      false
    );
  } else if (remainingDifference < 0) {
    distributeRemainingPoints(
      newCriteria,
      otherKeys,
      Math.abs(remainingDifference),
      true
    );
  }

  // Ensure total is exactly 100
  const total = getTotalWeight(newCriteria);
  if (total !== 100) {
    const diff = 100 - total;
    const largestKey = findLargestWeightKey(newCriteria);
    newCriteria[largestKey] += diff;
  }

  return newCriteria;
};

const distributeRemainingPoints = (
  criteria: HousingProviderSearchCriteria,
  keys: Array<keyof HousingProviderSearchCriteria>,
  points: number,
  isAddition: boolean
): void => {
  const sortedKeys = keys.sort((a, b) =>
    isAddition ? criteria[a] - criteria[b] : criteria[b] - criteria[a]
  );

  for (let i = 0; i < points; i++) {
    const keyToAdjust = sortedKeys[i % sortedKeys.length];
    if (isAddition) {
      criteria[keyToAdjust]++;
    } else if (criteria[keyToAdjust] > 0) {
      criteria[keyToAdjust]--;
    }
  }
};

const getTotalWeight = (criteria: HousingProviderSearchCriteria): number => {
  return Object.values(criteria).reduce((sum, val) => sum + val, 0);
};

const findLargestWeightKey = (
  criteria: HousingProviderSearchCriteria
): keyof HousingProviderSearchCriteria => {
  return Object.entries(criteria).sort(
    ([, a], [, b]) => b - a
  )[0][0] as keyof HousingProviderSearchCriteria;
};
