import { Link } from "react-router-dom";
import Search from "./Search";

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
      <Search />
      <button className="ml-auto text-2xl bg-lightOrange text-white px-4 py-2 rounded-lg mt-4 hover:bg-orange-600">
        Sign In
      </button>
    </header>
  );
};

export default Header;
