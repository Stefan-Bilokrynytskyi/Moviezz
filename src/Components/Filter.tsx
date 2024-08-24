import filterIcon from "../Icons/filter.svg";
import { filterParameters } from "../data";
import Button from "./Button";
import FilterParametersList from "./FilterParametersList";
import FilterListItem from "./FilterListItem";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Store/currentFilters";
interface FilterProps {
  toggleDropdown: (name: string) => void;
  isOpen: boolean;
  onFilterChange: () => void;
}
interface FilterParameter {
  name: string;
  filters: { name: string; linkName: string }[];
}
const Filter: React.FC<FilterProps> = ({
  toggleDropdown,
  isOpen,
  onFilterChange,
}) => {
  const [currentFilter, setCurrentFilter] = useState<FilterParameter | null>(
    null
  );

  const filters: RootState = useSelector(
    (state: { filters: RootState }) => state.filters
  );
  const currentFilters = filters.filters.reduce((acc, filter) => {
    if (filter.parameters.length > 0) {
      acc += filter.urlParameter + "=" + filter.parameters.join("|") + "&";

      return acc;
    }
    return acc;
  }, "");

  const isFiltersChanged: boolean = currentFilters === filters.previousFilters;

  const content: JSX.Element = currentFilter ? (
    <FilterParametersList
      name={currentFilter.name}
      filters={currentFilter.filters}
      handleClickBack={() => setCurrentFilter(null)}
    />
  ) : (
    <>
      {filterParameters.map((filter, index) => (
        <FilterListItem
          name={filter.name}
          key={filter.name}
          handleFilterClick={() => setCurrentFilter(filter)}
        />
      ))}
    </>
  );
  return (
    <div className="relative flex items-center">
      <button onClick={() => toggleDropdown("Filter")}>
        <div className="flex items-center gap-2">
          <img src={filterIcon} alt="sort" className="w-6 h-6" />
          <h3 className="text-lightGrey text-2xl">Filter</h3>
        </div>
      </button>
      {isOpen && (
        <ul
          className="absolute bg-lightBlack top-3/4 right-0 border border-dropdownGrey rounded-sm"
          style={{ borderWidth: "0.5px" }}
        >
          {content}
          <div className="flex justify-between px-2 my-2">
            <Button onClick={() => {}}>Cancel</Button>
            <Button onClick={onFilterChange} disabled={isFiltersChanged}>
              Apply
            </Button>
          </div>
        </ul>
      )}
    </div>
  );
};

export default Filter;
