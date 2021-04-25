// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer } from "electron";

import type { Releases, MessagingSignature } from "shared/messaging/releases";

import { IPC_EVENT_NAME } from "shared/messaging/releases";

type ReturnOf<T extends keyof MessagingSignature> = ReturnType<MessagingSignature[T]>;

const signatures: MessagingSignature = {
  fetchBlenderStableReleases: async (): Promise<Releases> => {
    const releases = (await ipcRenderer.invoke(IPC_EVENT_NAME, "stable")) as ReturnOf<"fetchBlenderStableReleases">;

    return releases;
  },
  fetchBlenderDailyReleases: async (): Promise<Releases> => {
    const releases = (await ipcRenderer.invoke(IPC_EVENT_NAME, "daily")) as ReturnOf<"fetchBlenderDailyReleases">;

    return releases;
  },
  fetchBlenderExperimentalReleases: async (): Promise<Releases> => {
    const releases = (await ipcRenderer.invoke(
      IPC_EVENT_NAME,
      "experimental"
    )) as ReturnOf<"fetchBlenderExperimentalReleases">;

    return releases;
  },
};

export { signatures };
