import { genres } from "./genres";
import { years } from "./years";
import { countries } from "./countries";

export interface FilterParameters {
  name: string;
  filters: { name: string; linkName: string }[];
}
const filterParameters: FilterParameters[] = [
  {
    name: "Genres",
    filters: genres,
  },
  {
    name: "Year",
    filters: years,
  },
  {
    name: "Country",
    filters: countries,
  },
];

export { filterParameters };
