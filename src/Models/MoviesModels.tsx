export interface MovieCardData {
  id: number;
  title: string;
  overview: string;
  vote_average: number;
  release_date: string;
  poster_path: string;
  media_type?: "movie";
  job?: string;
  genre_ids: number[];
}

export interface MovieData {
  title: string;
  original_title: string;
  overview: string;
  vote_average: number;
  release_date: string;
  poster_path: string;
  country: string;
  actors: string[];
  director: string;
  trailer: string;
  runtime: string;
  popularity: number;
  revenue: number;
  genres: string[];
}
