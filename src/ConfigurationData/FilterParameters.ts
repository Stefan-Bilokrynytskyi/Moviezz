import { movieGenres } from "./movieGenres";
import { tvShowGenres } from "./tvShowGenres";
import { years } from "./years";
import { countries } from "./countries";

export interface FilterParameters {
  name: string;
  filters: { name: string; linkName: string }[];
}
const movieFilterParameters: FilterParameters[] = [
  {
    name: "Genres",
    filters: movieGenres,
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

export { movieFilterParameters };

const tvShowFilterParameters: FilterParameters[] = [
  {
    name: "Genres",
    filters: tvShowGenres,
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

export { tvShowFilterParameters };
