// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcMain } from "electron";
import { join } from "path";

import type { IConfiguration } from "shared/messaging/configuration";

import { readConfiguration, writeConfiguration } from "main/io/configurations";
import { IPC_EVENT_NAME_READ_CONFIGURATION, IPC_EVENT_NAME_WRITE_CONFIGURATION } from "shared/messaging/configuration";
import { getDefaultUserDataDirectory } from "main/io/directory";

const setup = () => {
  ipcMain.handle(IPC_EVENT_NAME_READ_CONFIGURATION, async (_) => {
    const path = join(getDefaultUserDataDirectory()!, "configuration.json");
    const configuration = await readConfiguration(path);

    return configuration;
  });

  ipcMain.handle(
    IPC_EVENT_NAME_WRITE_CONFIGURATION,
    async (_, { configuration }: { configuration: IConfiguration }) => {
      const path = join(getDefaultUserDataDirectory()!, "configuration.json");
      await writeConfiguration(path, configuration);
    }
  );
};

export { setup };
