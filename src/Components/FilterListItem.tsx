import arrowRight from "../Icons/arrow-right.svg";
import { useSelector } from "react-redux";
import { RootState } from "../Store/currentFilters";

interface FilterListItemProps {
  name: string;
  handleFilterClick: () => void;
}

const FilterListItem: React.FC<FilterListItemProps> = ({
  name,
  handleFilterClick,
}) => {
  const filtersQuantity: number = useSelector(
    (state: { filters: RootState }) => {
      const filter = state.filters.filters.find(
        (filter) => filter.name === name
      );
      return filter ? filter.parameters.length : 0;
    }
  );
  return (
    <li
      onClick={handleFilterClick}
      className="text-lightGrey w-60 flex items-center justify-between text-lg my-1 py-2 px-4 hover:bg-dropdownGreyHover hover:cursor-pointer"
    >
      <h3 className="">{name}</h3>
      <div className="flex items-center">
        {filtersQuantity !== 0 && (
          <div className="text-lightGrey text-base px-2 border border-lightGrey rounded-lg">
            {filtersQuantity}
          </div>
        )}
        <img src={arrowRight} alt="arrowRight" className="w-6 h-6" />
      </div>
    </li>
  );
};

export default FilterListItem;
