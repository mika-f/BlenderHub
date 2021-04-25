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

export type { Platform };
export { getPlatform };
