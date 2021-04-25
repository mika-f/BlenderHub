import React from "react";

type Props = {
  onClick: () => void;
  disabled?: boolean;
  primary?: boolean;
};

const Button: React.FC<Props> = ({ children, disabled, primary, onClick }) => {
  const classes: string[] = [];
  if (primary) {
    classes.push(disabled ? "bg-gray-700" : "bg-blue-500");
  } else {
    classes.push("bg-surface-light005");
  }

  return (
    <button
      type="button"
      disabled={disabled}
      className={`focus:outline-none rounded shadow py-2 px-4 ${classes.join(" ")}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
