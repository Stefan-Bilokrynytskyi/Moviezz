import { useParams } from "react-router-dom";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { PersonData } from "../Models/Person";
import { fetchPerson } from "../http/queries";
import Avatar from "../Icons/avatar.svg";
import { format } from "date-fns";
import { useState, useEffect, useRef } from "react";
import TabJob from "../Components/TabJob";
import MovieCard from "../Components/MovieCard";
import TvShowCard from "../Components/TvShowCard";
import Carousel from "../Components/Carousel";

const PersonPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data,
    isLoading,
    isError,
    error,
  }: UseQueryResult<{
    person: PersonData;
  }> = useQuery({
    queryKey: ["person", id],
    queryFn: () =>
      fetchPerson(`person/${id}?append_to_response=movie_credits,tv_credits`),
  });

  const [isBiographyOpen, setIsBiographyOpen] = useState(false);
  const [isBiographyOverflow, setIsBiographyOverflow] = useState(false);
  const [currentJob, setCurrentJob] = useState<string>("");
  const biographyRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (biographyRef.current) {
      setIsBiographyOverflow(
        biographyRef.current.scrollHeight > biographyRef.current.clientHeight
      );
    }
  }, [data]);

  useEffect(() => {
    if (data && data.person.projects.length > 0) {
      setCurrentJob(data.person.projects[0].job);
    }
  }, [data]);

  const onJobClick = (job: string) => {
    setCurrentJob(job);
  };

  const toggleBiography = () => {
    setIsBiographyOpen(!isBiographyOpen);
  };

  let content: JSX.Element | null = null;

  if (isLoading) {
    content = <div>Loading...</div>;
  }
  if (isError) {
    content = <div>Error: {(error as Error).message}</div>;
  }
  if (data) {
    console.log(data);
    content = (
      <div className="mx-28 mt-14">
        <div className="flex gap-6 justify-start">
          <div className="w-1/6 flex-shrink-0">
            {data.person.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500/${data.person.profile_path}`}
                alt="poster"
                className="object-contain"
              />
            ) : (
              <img src={Avatar} alt="poster" className="object-contain" />
            )}
          </div>
          <div>
            <h2 className="text-lightGrey text-5xl mb-5 font-bold">
              {data.person.name}
            </h2>
            <div className="flex gap-1">
              <div className="flex flex-col gap-3 font-bold">
                {data.person.known_for_department && (
                  <p className="text-lightGrey text-2xl">Known for:</p>
                )}
                {data.person.birthday && (
                  <p className="text-lightGrey text-2xl">Birth date:</p>
                )}
                {data.person.deathday && (
                  <p className="text-lightGrey text-2xl">Death date:</p>
                )}
                {data.person.place_of_birth && (
                  <p className="text-lightGrey text-2xl">Place of birth:</p>
                )}
              </div>
              <div className="flex flex-col gap-3">
                {data.person.known_for_department && (
                  <p className="text-lightGrey text-2xl">
                    {data.person.known_for_department}
                  </p>
                )}
                {data.person.birthday && (
                  <p className="text-lightGrey text-2xl">
                    {format(new Date(data.person.birthday), "dd MMMM yyyy")}
                  </p>
                )}
                {data.person.deathday && (
                  <p className="text-lightGrey text-2xl">
                    {format(new Date(data.person.deathday), "dd MMMM yyyy")}
                  </p>
                )}
                {data.person.place_of_birth && (
                  <p className="text-lightGrey text-2xl">
                    {data.person.place_of_birth}
                  </p>
                )}
              </div>
            </div>
            {data.person.biography && (
              <>
                <div className="text-lightGrey text-2xl font-bold my-3">
                  Biography
                </div>
                <div className="relative">
                  <p
                    ref={biographyRef}
                    className={`text-lightGrey text-lg ${
                      isBiographyOpen ? "h-auto" : "h-28 overflow-hidden"
                    }`}
                  >
                    {data.person.biography}
                  </p>
                  {isBiographyOverflow && !isBiographyOpen && (
                    <div className="absolute bottom-0 w-full h-3 bg-gradient-to-t from-black to-transparent"></div>
                  )}
                </div>
                {isBiographyOverflow && (
                  <button
                    onClick={toggleBiography}
                    className="text-lightGrey text-lg mt-2 underline"
                  >
                    {isBiographyOpen ? "Show less" : "Read more"}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
        <Carousel
          projects={data.person.projects}
          currentJob={currentJob}
          onJobClick={onJobClick}
        ></Carousel>
        <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8">
          {data.person.projects
            .find((project) => project.job === currentJob)
            ?.movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          {data.person.projects
            .find((project) => project.job === currentJob)
            ?.tvShows.map((tvShow) => (
              <TvShowCard tvShow={tvShow} key={tvShow.id} />
            ))}
        </div>
      </div>
    );
  }

  return <>{content}</>;
};

export default PersonPage;
