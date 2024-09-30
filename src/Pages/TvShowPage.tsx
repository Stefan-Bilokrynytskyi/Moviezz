import { TvShowData } from "../Models/TvShowsModels";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchTvShow } from "../http/queries";
import { useParams } from "react-router-dom";
import MovieInfo from "../Components/MovieInfo";
import Rating from "../Components/Rating";
import ReactPlayer from "react-player";
import PlayIcon from "../Icons/play.svg";
import BlackBg from "../Icons/black-bg.svg";
import PlayIconDisabled from "../Icons/playDisabled.svg";

const TvShowPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error }: UseQueryResult<TvShowData> =
    useQuery({
      queryKey: ["tvshow", id],
      queryFn: () => fetchTvShow(id || ""),
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
          <div className="w-1/4 flex-shrink-0">
            <img
              src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
              alt="poster"
              className="object-contain"
            />
            <Rating rating={data.vote_average} popularity={data.popularity} />
          </div>
          <div>
            <h2 className="text-lightGrey text-5xl mb-5 font-bold">
              {data.name}
            </h2>
            <MovieInfo
              info={[
                { title: "Name", value: data.original_name },
                { title: "Year", value: data.first_air_date.slice(0, 4) },
                { title: "Country", value: data.country },
                { title: "Genres", value: data.genres.join(", ") },
                { title: "Seasons", value: data.seasons.toString() },
                { title: "Episodes", value: data.episodes.toString() },
                { title: "Status", value: data.status },
                {
                  title: "Actors",
                  value: data.actors.join(", "),
                },
              ]}
            />
            <p className="text-lightGrey text-2xl mt-5">{data.overview}</p>
          </div>
        </div>
        <div className="mt-14">
          <h2 className="text-lightGrey text-4xl font-bold">
            {data.trailer
              ? `${data.name}: Official Trailer`
              : "Unfortunately, there is no trailer available for this tv show"}
          </h2>
          <div className="mt-4 aspect-w-16 aspect-h-9">
            {data.trailer ? (
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${data.trailer}`}
                controls
                width="80%"
                height="80%"
                light={BlackBg}
                playing
                playIcon={
                  <img className="w-36 h-36" src={PlayIcon} alt="play" />
                }
              />
            ) : (
              <div className="bg-black w-4/5 h-4/5 flex justify-center">
                <img
                  className="w-36 h-36 self-center"
                  src={PlayIconDisabled}
                  alt="play"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  return <>{content}</>;
};

export default TvShowPage;
