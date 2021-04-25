import React from "react";

const AppContainer: React.FC = ({ children }) => (
  <div className="bg-surface-light text-gray-900 dark:bg-surface-dark dark:text-gray-100 min-h-screen max-h-screen flex flex-col">
    {children}
  </div>
);

export default AppContainer;
