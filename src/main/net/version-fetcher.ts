import cheerio from "cheerio";
import got from "got";

import type { Platform } from "main/platform";

type Version = {
  version: string;
  branch: string;
  url: string;
};

const fetchStableReleases = async (): Promise<Version[]> => {
  const versions: Version[] = [];

  try {
    const response = await got("https://download.blender.org/release/");
    const html = response.body;

    const $ = cheerio.load(html);
    $("pre", "a").each((_, element) => {
      const url = `https://download.blender.org/release/${$(element).attr("href")}`;
      const version = $(element).text();

      versions.push({ version, url, branch: "stable" });
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.response.status);
  }

  return versions;
};

const fetchDailyReleases = async (platform: Platform): Promise<Version[]> => {
  const versions: Version[] = [];

  try {
    const response = await got("https://builder.blender.org/download/");
    const html = response.body;

    const $ = cheerio.load(html);
    $("section", `builds-list platform-${platform}`).each((_i1, element) => {
      $("ul > li > a", element).each((_i2, link) => {
        // eslint-disable-next-line no-console
        console.log($(link).html());
      });
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.response.status);
  }

  return versions;
};

const fetchExperimentalReleases = async (_platform: Platform): Promise<Version[]> => {
  const versions: Version[] = [];

  return versions;
};

const fetchReleases = async (branch: "stable" | "daily" | "experimental", platform: Platform): Promise<Version[]> => {
  const versions: Version[] = [];

  switch (branch) {
    case "stable":
      versions.push(...(await fetchStableReleases()));
      break;

    case "daily":
      versions.push(...(await fetchDailyReleases(platform)));
      break;

    case "experimental":
      versions.push(...(await fetchExperimentalReleases(platform)));
      break;

    default:
      return [];
  }

  return versions;
};

export { fetchReleases };
