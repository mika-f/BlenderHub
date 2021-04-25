import React from "react";

type Props = {
  onClick: () => void;
  primary?: boolean;
};

const Button: React.FC<Props> = ({ children, primary, onClick }) => {
  const classes: string[] = [];
  if (primary) {
    classes.push("bg-blue-500");
  } else {
    classes.push("bg-surface-light005");
  }

  return (
    <button
      type="button"
      className={`focus:outline-none rounded shadow py-2 px-4 ${classes.join(" ")}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
