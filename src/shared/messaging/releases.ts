import { Branch } from "shared/branch";

type Release = {
  version: string;
  branch: Branch;
  url: string;
};

type Releases = Release[];

type MessagingSignature = {
  fetchBlenderStableReleases: () => Promise<Releases>;
  fetchBlenderDailyReleases: () => Promise<Releases>;
  fetchBlenderExperimentalReleases: () => Promise<Releases>;
};

const IPC_EVENT_NAME = "fetch-blender-releases";

export type { Release, Releases, MessagingSignature };

export { IPC_EVENT_NAME };
