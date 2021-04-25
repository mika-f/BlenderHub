// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcMain } from "electron";
import fs from "fs";
import { join } from "path";
import { promisify } from "util";

import { readInstallations } from "main/io/configuration";
import { getDefaultUserDataDirectory } from "main/io/directory";
import { IPC_EVENT_NAME } from "shared/messaging/installations";

const setup = () => {
  ipcMain.handle(IPC_EVENT_NAME, async () => {
    const dir = getDefaultUserDataDirectory();
    if (dir === undefined) {
      return {};
    }

    const path = join(dir, "installations.json");
    const isExists = await promisify(fs.exists)(path);
    if (!isExists) {
      return {};
    }

    const installations = await readInstallations(path);
    return installations;
  });
};

export { setup };
