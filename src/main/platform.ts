type Platform = "win" | "macOS" | "linux";

const getPlatform = (): Platform => {
  switch (process.platform) {
    case "darwin":
      return "macOS";

    case "win32":
      return "win";

    case "linux":
      return "linux";

    default:
      throw new Error("Unsupported Platform");
  }
};

const getPlatformExecutable = (): string => {
  switch (getPlatform()) {
    case "linux":
      return "";

    case "macOS":
      return ".app";

    case "win":
      return ".exe";

    default:
      throw new Error("Unsupported Platform");
  }
};

export type { Platform };
export { getPlatform, getPlatformExecutable };
