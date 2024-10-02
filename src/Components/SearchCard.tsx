import Star from "../Icons/star.svg";
import { MovieCardData } from "../Models/MoviesModels";
import { TvShowCardData } from "../Models/TvShowsModels";
import { PersonCardData } from "../Models/Person";
import { Link } from "react-router-dom";

interface SearchCardProps {
  card: MovieCardData | TvShowCardData | PersonCardData;
  onLinkClick: () => void;
}

const SearchCard: React.FC<SearchCardProps> = ({ card, onLinkClick }) => {
  let content: JSX.Element;

  if (card.media_type === "person") {
    content = (
      <div className="text-lightGrey text-xl hover:cursor-pointer hover:underline">
        {(card as PersonCardData).name}
      </div>
    );
  } else if (card.media_type === "movie" || card.media_type === "tv") {
    content = (
      <Link
        to={`/${card.media_type === "movie" ? "movie" : "tv-show"}s/${card.id}`}
        onClick={onLinkClick}
      >
        <div className="flex gap-2 items-start group">
          <img
            src={`https://image.tmdb.org/t/p/w500/${card.poster_path}`}
            alt="poster"
            className="w-12 h-12"
          />
          <div className="flex flex-col justify-between">
            <div className="text-lg text-lightGrey group-hover:underline hover:cursor-pointer">
              {card.media_type === "movie"
                ? (card as MovieCardData).title
                : (card as TvShowCardData).name}
            </div>
            <p className="text-lightGrey text-sm flex items-start">
              <img src={Star} alt="star" />
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
