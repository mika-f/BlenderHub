import { Branch } from "shared/branch";

type Installation = {
  version: string;
  branch: Branch;
  url: string;
  executable?: string;
};

type Installations = Installation[];

const fetchBlenderReleases = async (
  branch: Branch
): ReturnType<typeof window.messaging.releases.fetchBlenderDailyReleases> => {
  switch (branch) {
    case "stable":
      return window.messaging.releases.fetchBlenderStableReleases();

    case "daily":
      return window.messaging.releases.fetchBlenderDailyReleases();

    case "experimental":
      return window.messaging.releases.fetchBlenderExperimentalReleases();

    default:
      return [];
  }
};

const fetchBlenderReleasesWithInstallations = async (branch: Branch): Promise<Installations> => {
  const releases = await fetchBlenderReleases(branch);
  const installations = await window.messaging.installations.fetchInstallations();

  const items: Installations = [];

  for (let i = 0; i < releases.length; i += 1) {
    const release = releases[i];
    if (installations.find((w) => w.version === release.version && w.branch === release.branch)) {
      const installation = installations.filter((w) => w.version === release.version && w.branch === release.branch)[0];
      items.push({
        version: release.version,
        branch: release.branch,
        url: release.url,
        executable: installation.executable,
      });
    } else {
      items.push(release);
    }
  }

  return items;
};

export type { Installations };

export { fetchBlenderReleasesWithInstallations };
