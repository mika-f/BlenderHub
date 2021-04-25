// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer } from "electron";

import type { Installations, MessagingSignature } from "shared/messaging/installations";

import {
  IPC_EVENT_NAME_EXECUTE_INSTALLATION,
  IPC_EVENT_NAME_FETCH_INSTALLATIONS,
  IPC_EVENT_NAME_FLUSH_INSTALLATIONS,
} from "shared/messaging/installations";

type ReturnOf<T extends keyof MessagingSignature> = ReturnType<MessagingSignature[T]>;

const signatures: MessagingSignature = {
  executeInstallation: async ({ installation }): Promise<void> => {
    await ipcRenderer.invoke(IPC_EVENT_NAME_EXECUTE_INSTALLATION, { installation });
  },
  fetchInstallations: async (): Promise<Installations> => {
    const installations = (await ipcRenderer.invoke(
      IPC_EVENT_NAME_FETCH_INSTALLATIONS
    )) as ReturnOf<"fetchInstallations">;

    return installations;
  },
  flushInstallations: async ({ installations }) => {
    await ipcRenderer.invoke(IPC_EVENT_NAME_FLUSH_INSTALLATIONS, { installations });
  },
};

export { signatures };
