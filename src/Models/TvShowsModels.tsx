export interface TvShowCardData {
  id: number;
  name: string;
  vote_average: number;
  poster_path: string;
  first_air_date: string;
  media_type?: "tv";
  job?: string;
  genre_ids: number[];
}

export interface TvShowData {
  name: string;
  original_name: string;
  overview: string;
  vote_average: number;
  first_air_date: string;
  poster_path: string;
  country: string;
  actors: string[];
  trailer: string;
  popularity: number;
  seasons: number;
  episodes: number;
  genres: string[];
  status: string;
}
