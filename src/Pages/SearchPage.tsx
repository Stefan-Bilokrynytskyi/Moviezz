import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";
import { multiSearch } from "../http/queries";
import { MovieCardData } from "../Models/MoviesModels";
import { TvShowCardData } from "../Models/TvShowsModels";
import { PersonCardData } from "../Models/Person";
import MovieCard from "../Components/MovieCard";
import TvShowCard from "../Components/TvShowCard";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../http/http";
import Pagination from "../Components/Pagination";

const SearchPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query: string = queryParams.get("query") || "";
  const page: number = Number(queryParams.get("page")) || 1;
  console.log(query);
  const {
    data,
    isLoading,
    isError,
    error,
  }: UseQueryResult<{
    results: (MovieCardData | TvShowCardData | PersonCardData)[];
    totalPages: number;
    totalResults: number;
  }> = useQuery({
    queryKey: ["search", query + page],
    queryFn: () => multiSearch(`search/multi?query=${query}&page=${page}`),
  });
  const navigate = useNavigate();
  let content: JSX.Element | null = null;
  let foundMovies: MovieCardData[] = [];
  let foundTvShows: TvShowCardData[] = [];
  let foundPeople: PersonCardData[] = [];

  const onPageChange = (pageNumber: number) => {
    queryParams.set("page", pageNumber.toString());
    const queryParameters = decodeURIComponent(queryParams.toString());

    navigate(`?${queryParameters}`);
    queryClient.invalidateQueries({
      queryKey: ["search", query + pageNumber],
    });
  };

  if (isLoading) {
    content = <div>Loading...</div>;
  }
  if (isError) {
    content = <div>Error: {(error as Error).message}</div>;
  }

  if (data) {
    console.log(data);
    foundMovies = data.results.filter(
      (item) => item.media_type === "movie"
    ) as MovieCardData[];
    foundTvShows = data.results.filter(
      (item) => item.media_type === "tv"
    ) as TvShowCardData[];
    foundPeople = data.results.filter(
      (item) => item.media_type === "person"
    ) as PersonCardData[];
    console.log(foundMovies);
    content = (
      <div className="mx-28 my-5">
        <div className="text-lightGrey text-4xl font-bold">
          {data.totalResults} results found for the request "{query}"
        </div>
        {foundPeople.length > 0 && (
          <>
            <div className="text-3xl text-lightGrey mt-5 mb-3">Found Names</div>
            <div className="flex flex-wrap gap-3">
              {foundPeople.map((person) => (
                <Link to={`/person/${person.id}`} key={person.id}>
                  <span className="text-xl text-lightGrey hover:underline hover:cursor-pointer">
                    {person.name}
                  </span>
                </Link>
              ))}
            </div>
          </>
        )}

        {foundMovies.length > 0 && (
          <>
            {" "}
            <div className="text-3xl text-lightGrey mt-5 mb-3">
              Found Movies
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8">
              {foundMovies.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </div>
          </>
        )}
        {foundTvShows.length > 0 && (
          <>
            <div className="text-3xl text-lightGrey mt-5 mb-3">
              Found TV shows
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8">
              {foundTvShows.map((tvShow) => (
                <TvShowCard tvShow={tvShow} key={tvShow.id} />
              ))}
            </div>
          </>
        )}
        <Pagination
          page={page}
          firstPage={1}
          lastPage={data.totalPages}
          onPageChange={onPageChange}
        />
      </div>
    );
  }

  return <>{content}</>;
};

export default SearchPage;
