import cheerio from "cheerio";
import got from "got";

import type { Platform } from "../platform";

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
        console.log($(link).html());
      });
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err.response.status);
  }

  return versions;
};

const fetchExperimentalReleases = async (): Promise<Version[]> => {
  const versions: Version[] = [];

  return versions;
};

export { fetchStableReleases, fetchDailyReleases, fetchExperimentalReleases };
