export interface MovieCardData {
  id: number;
  title: string;
  overview: string;
  vote_average: number;
  release_date: string;
  poster_path: string;
  genre_ids: number[];
}

export interface MovieData {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  vote_average: number;
  release_date: string;
  poster_path: string;
  country: string;
  actors: string[];
  director: string;
  genres: string[];
}
