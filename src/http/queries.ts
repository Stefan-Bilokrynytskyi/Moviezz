import $api from "./http";
import { countries } from "../ConfigurationData/countries";
import { MovieCardData, MovieData } from "../Models/MoviesModels";
import { TvShowCardData, TvShowData } from "../Models/TvShowsModels";
import { PersonCardData, PersonData } from "../Models/Person";

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

export const fetchTvShows = async (
  url: string
): Promise<{ tvShows: TvShowCardData[]; totalPages: number }> => {
  try {
    const res = await $api.get(url);
    console.log(res.data);
    return { tvShows: res.data.results, totalPages: res.data.total_pages };
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

export const fetchTvShow = async (id: string): Promise<TvShowData> => {
  try {
    const res = await $api.get(`tv/${id}?append_to_response=credits,videos`);
    const {
      genres,
      origin_country,
      original_name,
      number_of_seasons,
      number_of_episodes,
      overview,
      poster_path,
      first_air_date,
      name,
      vote_average,
      popularity,
      status,
      credits,
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

    return {
      genres: genres.map((genre: { name: string }) => genre.name),
      country:
        countries.find((country) => country.linkName === origin_country[0])
          ?.name || "",
      actors: sortedActors,
      overview,
      popularity,
      original_name,
      poster_path,
      first_air_date,
      name,
      trailer,
      vote_average,
      status,
      seasons: number_of_seasons,
      episodes: number_of_episodes,
    };
  } catch (error: any) {
    throw new Error(error.message || "An error occurred");
  }
};

export const quickMultiSearch = async (
  url: string
): Promise<{
  results: (MovieCardData | TvShowCardData | PersonCardData)[];
}> => {
  try {
    const res = await $api.get(url);

    const limitedResults = res.data.results.slice(0, 10);

    const sortedResults = limitedResults.sort(
      (
        a: MovieCardData | TvShowCardData | PersonCardData,
        b: MovieCardData | TvShowCardData | PersonCardData
      ) => {
        if (a.media_type === "person" && b.media_type !== "person") {
          return 1;
        } else if (a.media_type !== "person" && b.media_type === "person") {
          return -1;
        } else {
          return 0;
        }
      }
    );

    return {
      results: sortedResults,
    };
  } catch (error: any) {
    throw new Error(error.message || "An error occurred");
  }
};

export const multiSearch = async (
  url: string
): Promise<{
  results: (MovieCardData | TvShowCardData | PersonCardData)[];
  totalPages: number;
  totalResults: number;
}> => {
  try {
    const res = await $api.get(url);

    return {
      results: res.data.results,
      totalPages: res.data.total_pages,
      totalResults: res.data.total_results,
    };
  } catch (error: any) {
    throw new Error(error.message || "An error occurred");
  }
};

export const fetchPerson = async (
  url: string
): Promise<{
  person: PersonData;
}> => {
  try {
    const res = await $api.get(url);

    const {
      name,
      birthday,
      deathday,
      place_of_birth,
      biography,
      profile_path,
      known_for_department,
      movie_credits,
      tv_credits,
    } = res.data;

    const projects: {
      job: string;
      movies: MovieCardData[];
      tvShows: TvShowCardData[];
    }[] = [];

    const addProject = (
      job: string,
      movie?: MovieCardData,
      tvShow?: TvShowCardData
    ) => {
      let project = projects.find((project) => project.job === job);
      if (!project) {
        project = { job, movies: [], tvShows: [] };
        projects.push(project);
      }

      if (movie) {
        const movieExists = project.movies.some((m) => m.id === movie.id);
        if (!movieExists) {
          project.movies.push(movie);
        }
      }

      if (tvShow) {
        const tvShowExists = project.tvShows.some((t) => t.id === tvShow.id);
        if (!tvShowExists) {
          project.tvShows.push(tvShow);
        }
      }
    };

    movie_credits.cast.forEach((movie: MovieCardData) =>
      addProject("Actor", movie)
    );
    tv_credits.cast.forEach((tvShow: TvShowCardData) =>
      addProject("Actor", undefined, tvShow)
    );

    movie_credits.crew.forEach((movie: MovieCardData) =>
      addProject(movie.job || "", movie)
    );
    tv_credits.crew.forEach((tvShow: TvShowCardData) =>
      addProject(tvShow.job || "", undefined, tvShow)
    );

    return {
      person: {
        name,
        birthday,
        deathday,
        place_of_birth,
        biography,
        profile_path,
        known_for_department,
        projects,
      },
    };
  } catch (error: any) {
    throw new Error(error.message || "An error occurred");
  }
};
