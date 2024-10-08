import SearchIcon from "../Icons/search.svg";
import Arrow from "../Icons/arrow-left-search.svg";
import { useState, useRef } from "react";
import useClickOutside from "../hooks/useClickOutside";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { quickMultiSearch } from "../http/queries";
import { MovieCardData } from "../Models/MoviesModels";
import { TvShowCardData } from "../Models/TvShowsModels";
import { PersonCardData } from "../Models/Person";
import SearchCard from "./SearchCard";
import { useNavigate } from "react-router-dom";
import "../hideScroll.css";

const Search: React.FC = () => {
  const searchRef = useRef<HTMLDivElement>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError,
    error,
  }: UseQueryResult<{
    results: (MovieCardData | TvShowCardData | PersonCardData)[];
  }> = useQuery({
    queryKey: ["search", searchTerm],
    queryFn: () => quickMultiSearch(`search/multi?query=${searchTerm}`),
    enabled: searchTerm.length > 1,
  });

  const onCloseSearch = (): void => {
    setIsSearchOpen(false);
    setSearchTerm("");
  };

  const handleLinkClick = (): void => {
    setSearchTerm("");
    setIsSearchOpen(false);
  };

  useClickOutside([searchRef], () => setIsSearchOpen(false));

  const handleSearchClick = (): void => {
    const encodedSearchTerm = encodeURIComponent(searchTerm.trim()).replace(
      /%20/g,
      "+"
    );
    navigate(`/search?query=${encodedSearchTerm}&page=${1}`);
    setSearchTerm("");
    setIsSearchOpen(false);
  };

  return (
    <div className="relative ml-auto mt-4 w-96" ref={searchRef}>
      {isSearchOpen && (
        <img
          src={Arrow}
          alt="back"
          className="absolute z-10 w-5 h-5 left-4 top-1/2 transform -translate-y-1/2 hover:cursor-pointer"
          onClick={onCloseSearch}
        />
      )}
      <input
        className={`w-full text-lg h-12 bg-transparent rounded-xl border border-lightGrey text-lightGrey focus:outline-none ${
          isSearchOpen ? "px-12" : "px-4"
        }`}
        placeholder="Search..."
        onFocus={() => setIsSearchOpen(true)}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <img
        src={SearchIcon}
        alt="search"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lightGrey hover:cursor-pointer"
        onClick={handleSearchClick}
      />
      {data && isSearchOpen && data.results.length > 0 && (
        <div className="absolute w-full max-h-[80vh] scrollbar-hide overflow-y-auto px-3 py-1 bg-lightBlack top-full mt-3 right-0 border border-dropdownGrey rounded-xl z-10">
          <div className="flex flex-col gap-3">
            {data.results.map((result) => (
              <SearchCard
                key={result.id}
                card={result}
                onLinkClick={handleLinkClick}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
