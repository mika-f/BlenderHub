import React from "react";
import { useLocation, useRouteMatch, Link } from "react-router-dom";

import FontAwesome from "./font-awesome";

type Props = {};

// Hmm...?
const getAppTitle = (path: string) => {
  switch (path) {
    case "/settings":
      return "Settings";

    default:
      return "Blender Hub";
  }
};

const Header: React.VFC<Props> = () => {
  const isInstallations = useRouteMatch("/installations/:branch")?.isExact;
  const path = useLocation().pathname;
  const title = getAppTitle(path);

  const hasPrevious = !isInstallations;

  return (
    <header className="h-14 shadow bg-surface-light005">
      <div className="flex items-center pt-4 pb-4">
        <div className="flex-grow flex">
          {hasPrevious ? (
            <Link to="/" className="ml-4">
              <FontAwesome className="h-6 w-6" type="solid" icon="arrow-left" />
            </Link>
          ) : null}
          <div className="select-none ml-4">{title}</div>
        </div>
        <Link to="/settings" className="mr-4">
          <FontAwesome className="h-6 w-6" type="solid" icon="cog" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
