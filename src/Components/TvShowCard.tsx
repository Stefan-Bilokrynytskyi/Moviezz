import star from "../Icons/star.svg";
import Projector from "../Icons/projector.svg";
import GENRES from "../ConfigurationData/tvShowGenres";
import { Link } from "react-router-dom";
import { TvShowCardData } from "../Models/TvShowsModels";

const TvShowCard: React.FC<{ tvShow: TvShowCardData }> = ({ tvShow }) => {
  const genresList: string = tvShow.genre_ids.reduce((acc, genreId) => {
    const genre = GENRES.find((genre) => genre.id === genreId);
    if (genre) {
      return acc + genre.name + ", ";
    }
    return acc;
  }, "");
  const poster: JSX.Element = tvShow.poster_path ? (
    <img
      src={`https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`}
      alt="poster"
      className="w-full h-5/6"
    ></img>
  ) : (
    <div className="w-full h-5/6 flex flex-col justify-center">
      <img src={Projector} className="" alt="poster" />

      <h2 className="text-lightGrey text-2xl font-bold uppercase text-center">
        Film is not available
      </h2>
    </div>
  );
  return (
    <Link to={`/tv-shows/${tvShow.id}`}>
      <div className="mb-5 h-fit">
        {poster}
        <h3 className="text-lightGrey text-lg mt-1">{tvShow.name}</h3>

        <p className="text-lightGrey text-sm flex items-start">
          <img src={star} alt="star" />
          <span className="text-lightOrange ml-1">
            {tvShow.vote_average.toFixed(1)}
          </span>
          <span className="text-grey ml-2">
            {tvShow.first_air_date.slice(0, 4)}, {genresList.slice(0, -2)}
          </span>
        </p>
      </div>
    </Link>
  );
};

export default TvShowCard;
