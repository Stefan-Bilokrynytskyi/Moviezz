import $api from "./http";
import { countries } from "../ConfigurationData/countries";

export const fetchMovies = async (url: string) => {
  try {
    const res = await $api.get(url);
    console.log(res.data);
    return { movies: res.data.results, totalPages: res.data.total_pages };
  } catch (error: any) {
    throw new Error(error.message || "An error occurred");
  }
};

export const fetchMovie = async (id: string) => {
  try {
    const res = await $api.get(`movie/${id}?append_to_response=credits`);
    const {
      genres,
      origin_country,
      original_title,
      overview,
      poster_path,
      release_date,
      title,
      vote_average,
      credits,
    } = res.data;
    const sortedActors = credits.cast
      .sort(
        (a: { popularity: number }, b: { popularity: number }) =>
          b.popularity - a.popularity
      )
      .slice(0, 8)
      .map((actor: { name: string }) => actor.name);
    return {
      genres: genres.map((genre: { id: number; name: string }) => genre.name),
      country: countries.find(
        (country) => country.linkName === origin_country[0]
      )?.name,
      actors: sortedActors,
      director: credits.crew.find(
        (crewman: { job: string }) => crewman.job === "Director"
      ).name,
      overview,
      original_title,
      poster_path,
      release_date,
      title,
      vote_average,
    };
  } catch (error: any) {
    throw new Error(error.message || "An error occurred");
  }
};
