import { MovieData } from "../Models/MoviesModels";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchMovie } from "../http/queries";
import { useParams } from "react-router-dom";
import MovieInfo from "../Components/MovieInfo";

const FilmPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error }: UseQueryResult<MovieData> =
    useQuery({
      queryKey: ["movie", id],
      queryFn: () => fetchMovie(id || ""),
      enabled: !!id,
    });
  let content: JSX.Element | null = null;

  if (isLoading) {
    content = <div>Loading...</div>;
  }

  if (isError) {
    content = <div>Error: {(error as Error).message}</div>;
  }
  if (data) {
    content = (
      <div className="mx-28 mt-14">
        <div className="flex gap-6 justify-start">
          <img
            src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
            alt="poster"
            className="w-1/4"
          />
          <div>
            <h2 className="text-lightGrey text-5xl mb-5">{data.title}</h2>
            <MovieInfo
              info={[
                { title: "Name", value: data.original_title },
                { title: "Year", value: data.release_date.slice(0, 4) },
                { title: "Country", value: data.country },
                { title: "Genres", value: data.genres.join(", ") },
                { title: "Director", value: data.director },
                {
                  title: "Actors",
                  value: data.actors.join(", "),
                },
              ]}
            />
            <p className="text-lightGrey text-xl mt-5">{data.overview}</p>
          </div>
        </div>
      </div>
    );
    console.log(data);
  }
  return <>{content}</>;
};

export default FilmPage;
