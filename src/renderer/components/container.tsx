import React from "react";

type Props = {
  className?: string;
};

const Container: React.FC<Props> = ({ children, className }) => (
  <div className={`bg-surface-light dark:bg-surface-dark ${className}`}> {children}</div>
);

export default Container;
