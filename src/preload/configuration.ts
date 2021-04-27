// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer } from "electron";

import type { IConfiguration, MessagingSignature } from "shared/messaging/configuration";

import { IPC_EVENT_NAME_READ_CONFIGURATION, IPC_EVENT_NAME_WRITE_CONFIGURATION } from "shared/messaging/configuration";

type ReturnOf<T extends keyof MessagingSignature> = ReturnType<MessagingSignature[T]>;

const signatures: MessagingSignature = {
  readConfiguration: async (): Promise<IConfiguration> => {
    const configuration = (await ipcRenderer.invoke(
      IPC_EVENT_NAME_READ_CONFIGURATION
    )) as ReturnOf<"readConfiguration">;

    return configuration;
  },
  writeConfiguration: async (configuration): Promise<void> => {
    await ipcRenderer.invoke(IPC_EVENT_NAME_WRITE_CONFIGURATION, { configuration });
  },
};

export { signatures };
