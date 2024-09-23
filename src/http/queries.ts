import $api from "./http";
import { countries } from "../ConfigurationData/countries";
import { MovieCardData, MovieData } from "../Models/MoviesModels";

export const fetchMovies = async (
  url: string
): Promise<{ movies: MovieCardData[]; totalPages: number }> => {
  try {
    const res = await $api.get(url);
    console.log(res.data);
    return { movies: res.data.results, totalPages: res.data.total_pages };
  } catch (error: any) {
    throw new Error(error.message || "An error occurred");
  }
};

export const fetchMovie = async (id: string): Promise<MovieData> => {
  try {
    const res = await $api.get(`movie/${id}?append_to_response=credits,videos`);
    const {
      genres,
      origin_country,
      original_title,
      overview,
      poster_path,
      release_date,
      title,
      vote_average,
      runtime,
      popularity,
      credits,
      revenue,
      videos,
    } = res.data;
    const sortedActors = credits.cast
      .sort(
        (a: { popularity: number }, b: { popularity: number }) =>
          b.popularity - a.popularity
      )
      .slice(0, 8)
      .map((actor: { name: string }) => actor.name);

    const trailer: string =
      videos.results.length > 0
        ? videos.results.find(
            (video: { type: string; official: boolean }) =>
              video.type === "Trailer" && video.official
          )?.key || videos.results[0].key
        : "";

    const hours: number = Math.floor(runtime / 60);
    const minutes: number = runtime % 60;
    const runtimeConverted: string = `${
      hours ? `${hours} hour${hours > 1 ? "s" : ""}` : ""
    } ${minutes ? `${minutes} minute${minutes > 1 ? "s" : ""}` : ""}`;
    return {
      genres: genres.map((genre: { id: number; name: string }) => genre.name),
      country:
        countries.find((country) => country.linkName === origin_country[0])
          ?.name || "",
      actors: sortedActors,
      director: credits.crew.find(
        (crewman: { job: string }) => crewman.job === "Director"
      ).name,
      runtime: runtimeConverted,
      overview,
      popularity,
      original_title,
      revenue,
      poster_path,
      release_date,
      title,
      trailer,
      vote_average,
    };
  } catch (error: any) {
    throw new Error(error.message || "An error occurred");
  }
};
