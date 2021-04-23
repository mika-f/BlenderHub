import os from "os";
import path from "path";

const getDarwinUserDataDirectory = (): string => {
  const homeDir = os.homedir();
  return path.join(homeDir, "Library/Application Support/Blender Hub");
};

const getLinuxUserDataDirectory = (): string => {
  const homeDir = os.homedir();
  return path.join(homeDir, ".config/blender-hub");
};

const getWindowsUserDataDirectory = (): string => {
  const appData = process.env.LOCALAPPDATA as string;
  return path.join(appData, "Blender Hub");
};

const getDefaultUserDataDirectory = (): string | undefined => {
  switch (process.platform) {
    case "darwin":
      return getDarwinUserDataDirectory();

    case "linux":
      return getLinuxUserDataDirectory();

    case "win32":
      return getWindowsUserDataDirectory();

    default:
      return undefined;
  }
};

export { getDefaultUserDataDirectory };
