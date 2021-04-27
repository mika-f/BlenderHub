import React from "react";

type Props = {
  title: string;
};

const Card: React.FC<Props> = ({ children, title }) => (
  <div className="shadow bg-surface-light dark:bg-surface-light005 px-4 py-2 my-2">
    <div className="my-2">
      <b className="capitalize text-xl select-none">{title}</b>
    </div>
    <div>{children}</div>
  </div>
);

export default Card;
