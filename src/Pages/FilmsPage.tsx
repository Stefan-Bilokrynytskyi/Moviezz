import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetchMovies } from "../http/queries";
import { Movie } from "../Models/MoviesModels";
import MovieCard from "../Components/MovieCard";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Pagination from "../Components/Pagination";
import Sort from "../Components/Sort";
import Filter from "../Components/Filter";
import { useState, useRef } from "react";
import { queryClient } from "../http/http";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Store/currentFilters";
import { filtersActions } from "../Store/currentFilters";
import useClickOutside from "../hooks/useClickOutside";

interface Dropdown {
  name: string;
  isOpen: boolean;
}

const FilmsPage: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryParameters: string = queryParams.toString();
  const page: number = Number(queryParams.get("page")) || 1;

  const filters: RootState = useSelector(
    (state: { filters: RootState }) => state.filters
  );

  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError,
    error,
  }: UseQueryResult<{ movies: Movie[]; totalPages: number }> = useQuery({
    queryKey: ["movies", queryParameters],
    queryFn: () =>
      fetchMovies(
        `discover/movie?language=en-US&vote_count.gte=300&${queryParameters}`
      ),
  });
  const [dropDowns, setDropDowns] = useState<Dropdown[]>([
    { name: "Sort", isOpen: false },
    { name: "Filter", isOpen: false },
  ]);

  const sortRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  useClickOutside([sortRef, filterRef], () => {
    setDropDowns((prevDropDowns) =>
      prevDropDowns.map((dropDown) => ({ ...dropDown, isOpen: false }))
    );
  });

  const toggleDropDown = (name: string) => {
    const newDropDowns = dropDowns.map((dropDown) => {
      if (dropDown.name !== name) return { ...dropDown, isOpen: false };
      return { ...dropDown, isOpen: !dropDown.isOpen };
    });
    setDropDowns(newDropDowns);
  };

  const onPageChange = (pageNumber: number) => {
    queryParams.set("page", pageNumber.toString());
    const queryParameters = decodeURIComponent(queryParams.toString());
    setDropDowns((prevDropDowns) =>
      prevDropDowns.map((dropDown) => ({ ...dropDown, isOpen: false }))
    );
    navigate(`?${queryParameters}`);
    queryClient.invalidateQueries({
      queryKey: ["movies", queryParameters],
    });
  };

  const onSortChange = (sortParameter: string) => {
    const currentFilters = filters.filters.reduce((acc, filter) => {
      if (filter.parameters.length > 0) {
        acc += filter.urlParameter + "=" + filter.parameters.join("|") + "&";

        return acc;
      }
      return acc;
    }, "");
    if (currentFilters !== filters.previousFilters) {
      console.log("here");
      dispatch(filtersActions.resetFilters());
    }
    queryParams.set("sort_by", sortParameter);
    queryParams.set("page", "1");
    const queryParameters = decodeURIComponent(queryParams.toString());
    setDropDowns((prevDropDowns) =>
      prevDropDowns.map((dropDown) => ({ ...dropDown, isOpen: false }))
    );
    navigate(`?${queryParameters}`);
    queryClient.invalidateQueries({
      queryKey: ["movies", queryParameters],
    });
  };

  const onFilterChange = () => {
    let previousFilters = "";
    filters.filters.forEach((filter) => {
      if (filter.parameters.length > 0) {
        queryParams.set(filter.urlParameter, filter.parameters.join("|"));
        previousFilters +=
          filter.urlParameter + "=" + filter.parameters.join("|") + "&";
      } else queryParams.delete(filter.urlParameter);
    });
    dispatch(filtersActions.setPreviousFilters({ filters: previousFilters }));
    setDropDowns((prevDropDowns) =>
      prevDropDowns.map((dropDown) => ({ ...dropDown, isOpen: false }))
    );
    queryParams.set("page", "1");

    const queryParameters = decodeURIComponent(queryParams.toString());

    navigate(`?${queryParameters}`);
    queryClient.invalidateQueries({
      queryKey: ["movies", queryParameters],
    });
  };

  const onFilterCancel = () => {
    filters.filters.forEach((filter) => {
      queryParams.delete(filter.urlParameter);
    });
    dispatch(filtersActions.cancelFilters());
    setDropDowns((prevDropDowns) =>
      prevDropDowns.map((dropDown) => ({ ...dropDown, isOpen: false }))
    );
    queryParams.set("page", "1");
    const queryParameters = decodeURIComponent(queryParams.toString());
    navigate(`?${queryParameters}`);
    queryClient.invalidateQueries({
      queryKey: ["movies", queryParameters],
    });
  };

  let content: JSX.Element | null = null;

  if (isLoading) {
    content = <div>Loading...</div>;
  }

  if (isError) {
    content = <div>Error: {(error as Error).message}</div>;
  }
  if (data) {
    content = (
      <div className="mx-28 my-12">
        <div className="flex justify-between">
          <h2 className="text-lightGrey text-5xl mb-5">Popular movies</h2>
          <div className="relative flex gap-6">
            <div ref={filterRef} className="flex items-center">
              <Filter
                toggleDropdown={toggleDropDown}
                isOpen={
                  dropDowns.find((dropDown) => dropDown.name === "Filter")
                    ?.isOpen ?? false
                }
                onFilterChange={onFilterChange}
                onFilterCancel={onFilterCancel}
              />
            </div>
            <div ref={sortRef} className="relative flex items-center">
              <Sort
                toggleDropdown={toggleDropDown}
                isOpen={
                  dropDowns.find((dropDown) => dropDown.name === "Sort")
                    ?.isOpen ?? false
                }
                onSortChange={onSortChange}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-x-8">
          {data.movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
        <Pagination
          page={page}
          firstPage={1}
          lastPage={Number(data.totalPages)}
          onPageChange={onPageChange}
        />
      </div>
    );
  }
  return <>{content}</>;
};

export default FilmsPage;
