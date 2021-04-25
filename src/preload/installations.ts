// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer } from "electron";

import type { Installations, MessagingSignature } from "shared/messaging/installations";

import { IPC_EVENT_NAME } from "shared/messaging/installations";

type ReturnOf<T extends keyof MessagingSignature> = ReturnType<MessagingSignature[T]>;

const signatures: MessagingSignature = {
  fetchInstallations: async (): Promise<Installations> => {
    const installations = (await ipcRenderer.invoke(IPC_EVENT_NAME)) as ReturnOf<"fetchInstallations">;

    return installations;
  },
};

export { signatures };
