import { MovieData } from "../Models/MoviesModels";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchMovie } from "../http/queries";
import { useParams } from "react-router-dom";
import MovieInfo from "../Components/MovieInfo";
import Rating from "../Components/Rating";
import ReactPlayer from "react-player";
import PlayIcon from "../Icons/play.svg";
import BlackBg from "../Icons/black-bg.svg";
import PlayIconDisabled from "../Icons/playDisabled.svg";
import { useRef } from "react";
import ErrorModal from "../Components/ErrorModal";
import { useNavigate } from "react-router-dom";
import Projector from "../Icons/projector.svg";

const FilmPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error }: UseQueryResult<MovieData> =
    useQuery({
      queryKey: ["movie", id],
      queryFn: () => fetchMovie(id || ""),
      enabled: !!id,
    });
  const modalRef = useRef<HTMLDialogElement>(null);
  let content: JSX.Element | null = null;
  const navigate = useNavigate();

  if (isLoading) {
    content = <div>Loading...</div>;
  }

  if (isError) {
    modalRef.current?.showModal();
    content = <></>;
    console.error((error as Error).message);
  }
  if (data) {
    console.log(data.poster_path);
    content = (
      <div className="mx-28 mt-14">
        <div className="flex gap-6 justify-start">
          <div className="w-1/4 flex-shrink-0">
            {data.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
                alt="poster"
                className="object-contain"
              />
            ) : (
              <div className="w-full h-5/6 flex flex-col justify-center">
                <img src={Projector} className="" alt="poster" />

                <h2 className="text-lightGrey text-2xl font-bold uppercase text-center">
                  Poster is not available
                </h2>
              </div>
            )}
            <Rating
              rating={data.vote_average}
              popularity={data.popularity}
              revenue={data.revenue}
            />
          </div>
          <div>
            <h2 className="text-lightGrey text-5xl mb-5 font-bold">
              {data.title}
            </h2>
            <MovieInfo
              info={[
                { title: "Name", value: data.original_title },
                { title: "Year", value: data.release_date.slice(0, 4) },
                { title: "Country", value: data.country },
                { title: "Genres", value: data.genres.join(", ") },
                { title: "Director", value: data.director },
                { title: "Runtime", value: data.runtime },
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
              ? `${data.title}: Official Trailer`
              : "Unfortunately, there is no trailer available for this movie"}
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
    console.log(data.trailer);
  }
  return (
    <>
      <ErrorModal ref={modalRef} onReset={() => navigate("/")} />
      {content}
    </>
  );
};

export default FilmPage;
