import { House } from "../../../../housingProvider/domain/HousingProvider";

interface Props {
  house: House;
}

export const HouseItem = ({ house }: Props) => {
  return (
    <li>
      <span>{house.address}</span>
    </li>
  );
};
