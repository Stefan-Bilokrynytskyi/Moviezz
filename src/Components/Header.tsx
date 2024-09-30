import { Link } from "react-router-dom";
import Search from "../Icons/search.svg";

const Header: React.FC = () => {
  return (
    <header className="mx-28 flex items-center">
      <h1 className="text-lightGrey text-6xl font-bold">
        Movie<span className="text-lightOrange">ss</span>
      </h1>
      <nav className="flex gap-x-11 ml-24 mt-4">
        <Link to="/">
          <div className="text-lightGrey text-2xl hover:text-lightOrange">
            Home
          </div>
        </Link>
        <Link to="/movies">
          <div className="text-lightGrey text-2xl hover:text-lightOrange">
            Movies
          </div>
        </Link>
        <Link to="/tv-shows">
          <div className="text-lightGrey text-2xl hover:text-lightOrange">
            TV Shows
          </div>
        </Link>
      </nav>
      <div className="relative ml-auto mt-4 w-96">
        <input
          className="w-full text-lg h-12 bg-transparent rounded-xl px-4  border border-lightGrey text-lightGrey focus:outline-none"
          placeholder="Search..."
        />
        <img
          src={Search}
          alt="search"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lightGrey"
        />
      </div>
      <button className="ml-auto text-2xl bg-lightOrange text-white px-4 py-2 rounded-lg mt-4 hover:bg-orange-600">
        Sign In
      </button>
    </header>
  );
};

export default Header;
