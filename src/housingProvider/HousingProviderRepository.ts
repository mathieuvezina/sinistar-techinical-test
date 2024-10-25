import databaseJson from "./database.json";
import { House } from "./domain/HousingProvider";

type HouseEntity = House[] | null;
type DatabaseInstanceType = {
  HouseEntity: HouseEntity;
};

const DatabaseInstance: DatabaseInstanceType = {
  HouseEntity: null,
};

const db = {
  Houses: () => {
    if (!DatabaseInstance.HouseEntity) {
      DatabaseInstance.HouseEntity = databaseJson as House[];
    }

    return DatabaseInstance.HouseEntity;
  },
};

export const HousingProviderRepository = {
  list: () => {
    return db.Houses();
  },
};
