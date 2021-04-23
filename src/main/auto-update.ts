import updater from "update-electron-app";

const runUpdater = () => {
  updater({
    repo: "mika-f/blender-hub",
    updateInterval: "1 hour",
    notifyUser: true,
  });
};

export { runUpdater };
