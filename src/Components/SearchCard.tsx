import Star from "../Icons/star.svg";
import { MovieCardData } from "../Models/MoviesModels";
import { TvShowCardData } from "../Models/TvShowsModels";
import { PersonCardData } from "../Models/Person";
import { Link } from "react-router-dom";
import Projector from "../Icons/projector.svg";

interface SearchCardProps {
  card: MovieCardData | TvShowCardData | PersonCardData;
  onLinkClick: () => void;
}

const SearchCard: React.FC<SearchCardProps> = ({ card, onLinkClick }) => {
  let content: JSX.Element;

  if (card.media_type === "person") {
    content = (
      <Link to={`/person/${card.id}`} onClick={onLinkClick}>
        <div className="text-lightGrey text-xl hover:cursor-pointer hover:underline">
          {(card as PersonCardData).name}
        </div>
      </Link>
    );
  } else if (card.media_type === "movie" || card.media_type === "tv") {
    content = (
      <Link
        to={`/${card.media_type === "movie" ? "movie" : "tv-show"}s/${card.id}`}
        onClick={onLinkClick}
      >
        <div className="flex gap-2 items-start group">
          {card.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500/${card.poster_path}`}
              alt="poster"
              className="w-12 h-12 flex-shrink-0"
            />
          ) : (
            <img src={Projector} alt="projector" className="w-12 h-12" />
          )}

          <div className="flex flex-col justify-between min-h-12">
            <div className="text-base text-lightGrey  group-hover:underline hover:cursor-pointer">
              {card.media_type === "movie"
                ? (card as MovieCardData).title
                : (card as TvShowCardData).name}
            </div>
            <p className="text-lightGrey text-sm flex items-center">
              <img src={Star} alt="star" className="w-4 h-4" />
              {"vote_average" in card && (
                <>
                  <span className="text-lightOrange ml-1">
                    {(
                      card as MovieCardData | TvShowCardData
                    ).vote_average.toFixed(1)}
                  </span>
                  <span className="text-grey ml-2">
                    {card.media_type === "movie"
                      ? (card as MovieCardData).release_date.slice(0, 4)
                      : (card as TvShowCardData).first_air_date.slice(0, 4)}
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
      </Link>
    );
  } else content = <></>;

  return <>{content}</>;
};

export default SearchCard;
