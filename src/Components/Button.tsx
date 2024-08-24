interface ButtonProps {
  children: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={`bg-bgButton py-1 px-6 text-xl text-lightGrey rounded hover:bg-bgButtonHover ${
        props.disabled ? "text-black hover:bg-bgButton" : ""
      }`}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
