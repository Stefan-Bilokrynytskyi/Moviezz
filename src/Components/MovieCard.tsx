import { MovieCardData } from "../Models/MoviesModels";
import star from "../Icons/star.svg";
import Projector from "../Icons/projector.svg";
import GENRES from "../ConfigurationData/genres";
import { Link } from "react-router-dom";

const MovieCard: React.FC<{ movie: MovieCardData }> = ({ movie }) => {
  const genresList: string = movie.genre_ids.reduce((acc, genreId) => {
    const genre = GENRES.find((genre) => genre.id === genreId);
    if (genre) {
      return acc + genre.name + ", ";
    }
    return acc;
  }, "");
  const poster: JSX.Element = movie.poster_path ? (
    <img
      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
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
    <Link to={`/movies/${movie.id}`}>
      <div className="mb-5 h-fit">
        {poster}
        <h3 className="text-lightGrey text-lg mt-1">{movie.title}</h3>

        <p className="text-lightGrey text-sm flex items-start">
          <img src={star} alt="star" />
          <span className="text-lightOrange ml-1">
            {movie.vote_average.toFixed(1)}
          </span>
          <span className="text-grey ml-2">
            {movie.release_date.slice(0, 4)}, {genresList.slice(0, -2)}
          </span>
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;
