import type { Branch } from "shared/branch";

import { getPlatform } from "main/platform";

const makePlatformUrl = () => {
  switch (getPlatform()) {
    case "linux":
      return "linux64";

    case "macOS":
      return "macOS";

    case "win":
      return "windows64";

    default:
      return "";
  }
};

const makePlatformArchive = () => {
  switch (getPlatform()) {
    case "linux":
      return "tar.xz";

    case "macOS":
      return "dmg";

    case "win":
      return "zip";

    default:
      return "zip";
  }
};

const makeDownloadUrl = (baseUrl: string, branch: Branch, version: string): string => {
  switch (branch) {
    case "stable":
      return `${baseUrl}/blender-${version}-${makePlatformUrl()}.${makePlatformArchive()}`;

    case "daily":
      return `${baseUrl}`;

    case "experimental":
      return `${baseUrl}`;

    default:
      return "";
  }
};

export { makeDownloadUrl };
