import { FilterParameters } from "../data";
import ParameterCheckbox from "./ParameterCheckbox";
import arrowLeft from "../Icons/arrow-left.svg";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { RootState } from "../Store/currentFilters";
import { useSelector } from "react-redux";
import { filtersActions } from "../Store/currentFilters";
interface FilterParametersListProps extends FilterParameters {
  handleClickBack: () => void;
}

const FilterParametersList: React.FC<FilterParametersListProps> = ({
  name,
  filters,
  handleClickBack,
}) => {
  const dispatch = useDispatch();

  const currentFilters: RootState = useSelector(
    (state: { filters: RootState }) => state.filters
  );
  const checkedParameters: string[] =
    currentFilters.filters
      .find((filter) => filter.name === name)
      ?.parameters.map(
        (parameter) =>
          filters.find((filter) => filter.linkName === parameter)?.name || ""
      ) || [];

  const handleCheckboxClick = (
    isChecked: boolean,

    linkName: string
  ) => {
    if (isChecked) {
      dispatch(filtersActions.remove({ name, linkName }));
    } else {
      dispatch(filtersActions.add({ name, linkName }));
    }
  };

  return (
    <div className="w-60">
      <button
        onClick={handleClickBack}
        className="flex items-center px-4 py-2 border-b-2 border-b-dropdownGrey w-full gap-2 hover:bg-dropdownGreyHover"
      >
        <img src={arrowLeft} alt="arrow" className="w-6 h-6" />
        <h3 className="text-2xl text-lightGrey">{name}</h3>
      </button>
      <ul className="h-96 overflow-auto">
        {filters.map((filter) => (
          <li key={filter.name}>
            <ParameterCheckbox
              name={filter.name}
              isChecked={checkedParameters.includes(filter.name)}
              handleClickCheckbox={handleCheckboxClick}
              linkName={filter.linkName}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterParametersList;
