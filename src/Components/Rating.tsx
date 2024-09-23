import IMDB from "../Icons/imdb.svg";
import Top from "../Icons/top.svg";
import Star from "../Components/Star";
import Dollar from "../Icons/dollar.svg";
import { parseNumberIntoStringShortcut } from "../utils";

const Rating: React.FC<{
  rating: number;
  popularity: number;
  revenue: number;
}> = ({ rating, popularity, revenue }) => {
  console.log(rating);
  const integerPart: number = Math.floor(rating);
  const fractionalPart: number = parseFloat((rating - integerPart).toFixed(1));
  const stars: number[] = Array(integerPart)
    .fill(1)
    .concat(fractionalPart, Array(10 - integerPart - 1).fill(0));

  return (
    <>
      <div className="flex justify-center gap-5">
        <div className="flex gap-2 items-center">
          <img src={IMDB} alt="rating" className="w-12 h-12" />
          <p className="text-lightGrey text-2xl flex-grow">
            {rating.toFixed(1)}
          </p>
        </div>
        <div className="flex gap-1 items-center ">
          <img src={Top} alt="popularity" className="w-10 h-7" />
          <p className="text-lightGrey text-2xl">
            {parseNumberIntoStringShortcut(popularity)}
          </p>
        </div>
        <div className="flex items-center">
          <img src={Dollar} alt="revenue" className="w-7 h-7" />
          <p className="text-lightGrey text-2xl">
            {parseNumberIntoStringShortcut(revenue)}
          </p>
        </div>
      </div>
      <div className="flex justify-center gap-0">
        {stars.map((star, index) => (
          <Star key={index} percentage={star} />
        ))}
      </div>
    </>
  );
};

export default Rating;
