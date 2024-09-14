interface ParameterCheckboxProps {
  name: string;
  linkName: string;
  isChecked: boolean;
  handleClickCheckbox: (
    isChecked: boolean,

    linkName: string
  ) => void;
}

const ParameterCheckbox: React.FC<ParameterCheckboxProps> = ({
  name,
  linkName,
  isChecked,
  handleClickCheckbox,
}) => {
  return (
    <button
      onClick={() => handleClickCheckbox(isChecked, linkName)}
      className="flex items-center gap-2 px-4 py-1 hover:bg-dropdownGreyHover hover:cursor-pointer w-full"
    >
      <input
        type="checkbox"
        className="appearance-none text-lightBlack w-4 h-4 rounded-sm bg-transparent border border-lightGrey border-1 checked:bg-lightOrange checked:border-0 checked:bg-checkmark checked:bg-center"
        checked={isChecked}
        onChange={() => handleClickCheckbox(isChecked, linkName)}
      />
      <h3 className="text-lightGrey text-lg text-left grow">{name}</h3>
    </button>
  );
};

export default ParameterCheckbox;
