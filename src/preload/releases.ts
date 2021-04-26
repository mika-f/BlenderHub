// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer } from "electron";

import type { Releases, MessagingSignature } from "shared/messaging/releases";

import {
  IPC_EVENT_NAME_DOWNLOAD_BLENDER,
  IPC_EVENT_NAME_DOWNLOAD_BLENDER_COMPLETED,
  IPC_EVENT_NAME_DOWNLOAD_BLENDER_PROGRESS,
  IPC_EVENT_NAME_FETCH_BLENDER_RELEASES,
} from "shared/messaging/releases";

type ReturnOf<T extends keyof MessagingSignature> = ReturnType<MessagingSignature[T]>;

const signatures: MessagingSignature = {
  downloadBlender: async ({ branch, version, url, onProgress, onCompleted }): Promise<void> => {
    const onProgressInternal = (_: any, { progress }: { progress: number }) => {
      onProgress(progress);
    };
    const onCompletedInternal = (_: any, { path }: { path: string }) => {
      onCompleted(path);
    };

    ipcRenderer.on(IPC_EVENT_NAME_DOWNLOAD_BLENDER_PROGRESS, onProgressInternal);

    ipcRenderer.on(IPC_EVENT_NAME_DOWNLOAD_BLENDER_COMPLETED, onCompletedInternal);

    ipcRenderer.once(IPC_EVENT_NAME_DOWNLOAD_BLENDER_COMPLETED, () => {
      ipcRenderer.removeListener(IPC_EVENT_NAME_DOWNLOAD_BLENDER_PROGRESS, onProgressInternal);
      ipcRenderer.removeListener(IPC_EVENT_NAME_DOWNLOAD_BLENDER_COMPLETED, onCompletedInternal);
    });

    await ipcRenderer.invoke(IPC_EVENT_NAME_DOWNLOAD_BLENDER, { branch, version, url });
  },
  fetchBlenderStableReleases: async (): Promise<Releases> => {
    const releases = (await ipcRenderer.invoke(IPC_EVENT_NAME_FETCH_BLENDER_RELEASES, {
      branch: "stable",
    })) as ReturnOf<"fetchBlenderStableReleases">;

    return releases;
  },
  fetchBlenderDailyReleases: async (): Promise<Releases> => {
    const releases = (await ipcRenderer.invoke(IPC_EVENT_NAME_FETCH_BLENDER_RELEASES, {
      branch: "daily",
    })) as ReturnOf<"fetchBlenderDailyReleases">;

    return releases;
  },
  fetchBlenderExperimentalReleases: async (): Promise<Releases> => {
    const releases = (await ipcRenderer.invoke(IPC_EVENT_NAME_FETCH_BLENDER_RELEASES, {
      branch: "experimental",
    })) as ReturnOf<"fetchBlenderExperimentalReleases">;

    return releases;
  },
};

export { signatures };
