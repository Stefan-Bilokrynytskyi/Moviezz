import { MovieCardData } from "./MoviesModels";
import { TvShowCardData } from "./TvShowsModels";
export interface PersonCardData {
  id: number;
  name: string;
  media_type?: "person";
}

export interface PersonData {
  name: string;
  birthday: string;
  deathday: string;
  place_of_birth: string;
  biography: string;
  profile_path: string;
  known_for_department: string;
  projects: {
    job: string;
    movies: MovieCardData[];
    tvShows: TvShowCardData[];
  }[];
}
