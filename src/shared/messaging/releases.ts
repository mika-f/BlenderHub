import { Branch } from "shared/branch";

type Release = {
  version: string;
  branch: Branch;
  url: string;
  state?: {
    isDownloading: boolean;
    percentage: number;
  };
};

type Releases = Release[];

type OnProgressCallback = (progress: number) => void;

type OnCompletedCallback = (path: string) => void;

type MessagingSignature = {
  downloadBlender: (args: {
    branch: Branch;
    version: string;
    url: string;
    onProgress: OnProgressCallback;
    onCompleted: OnCompletedCallback;
  }) => Promise<void>;
  fetchBlenderStableReleases: () => Promise<Releases>;
  fetchBlenderDailyReleases: () => Promise<Releases>;
  fetchBlenderExperimentalReleases: () => Promise<Releases>;
};

const IPC_EVENT_NAME_DOWNLOAD_BLENDER = "download-blender";
const IPC_EVENT_NAME_DOWNLOAD_BLENDER_COMPLETED = "download-blender-completed";
const IPC_EVENT_NAME_DOWNLOAD_BLENDER_PROGRESS = "download-blender-progress";
const IPC_EVENT_NAME_FETCH_BLENDER_RELEASES = "fetch-blender-releases";

export type { OnCompletedCallback, OnProgressCallback, Release, Releases, MessagingSignature };

export {
  IPC_EVENT_NAME_DOWNLOAD_BLENDER,
  IPC_EVENT_NAME_DOWNLOAD_BLENDER_COMPLETED,
  IPC_EVENT_NAME_DOWNLOAD_BLENDER_PROGRESS,
  IPC_EVENT_NAME_FETCH_BLENDER_RELEASES,
};
