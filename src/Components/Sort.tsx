import sortIcon from "../Icons/sort.svg";
import { sortingParameters } from "../data";

interface SortProps {
  toggleDropdown: (name: string) => void;
  isOpen: boolean;
  onSortChange: (sortParameter: string) => void;
}
const Sort: React.FC<SortProps> = ({
  toggleDropdown,
  isOpen,
  onSortChange,
}) => {
  return (
    <div className="relative flex items-center">
      <button onClick={() => toggleDropdown("Sort")}>
        <div className="flex items-center gap-2">
          <img src={sortIcon} alt="sort" className="w-6 h-6" />
          <h3 className="text-lightGrey text-2xl">Sort by</h3>
        </div>
      </button>
      {isOpen && (
        <ul
          className="absolute bg-lightBlack w-fit top-3/4 right-0 border border-dropdownGrey rounded-sm"
          style={{ borderWidth: "0.5px" }}
        >
          {sortingParameters.map((parameter) => (
            <li
              key={parameter.name}
              className="text-lightGrey text-lg my-1 py-2 px-4 block hover:bg-dropdownGreyHover hover:cursor-pointer whitespace-nowrap"
              onClick={() => onSortChange(parameter.linkName)}
            >
              {parameter.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sort;
