import React from "react";
import { Link, useLocation } from "react-router-dom";

type Props = {
  items: { title: string; path: string }[];
};

const Sidebar: React.VFC<Props> = ({ items }) => {
  const path = useLocation();

  return (
    <div className="w-64 flex flex-col">
      {items.map((item) => {
        const isMatch = path?.pathname === item.path;
        const additionalClasses: string[] = [];

        if (isMatch) {
          additionalClasses.push("text-blue-400");
        }

        return (
          <Link
            to={item.path}
            key={item.path}
            className={`ml-4 h-12 flex flex-col justify-center ${additionalClasses}`}
          >
            {item.title}
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
