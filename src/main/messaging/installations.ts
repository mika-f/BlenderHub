// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcMain } from "electron";
import fs from "fs";
import { join } from "path";
import { promisify } from "util";

import type { Installations } from "shared/messaging/installations";

import { readInstallations, writeInstallations } from "main/io/configuration";
import { getDefaultUserDataDirectory } from "main/io/directory";
import { IPC_EVENT_NAME_FETCH_INSTALLATIONS, IPC_EVENT_NAME_FLUSH_INSTALLATIONS } from "shared/messaging/installations";

const setup = () => {
  ipcMain.handle(IPC_EVENT_NAME_FETCH_INSTALLATIONS, async () => {
    const dir = getDefaultUserDataDirectory();
    if (dir === undefined) {
      return {};
    }

    const path = join(dir, "installations.json");
    const isExists = await promisify(fs.exists)(path);
    if (!isExists) {
      return {};
    }

    const { installations } = await readInstallations(path);

    return installations;
  });

  ipcMain.handle(IPC_EVENT_NAME_FLUSH_INSTALLATIONS, async (_, { installations }: { installations: Installations }) => {
    const dir = getDefaultUserDataDirectory();
    if (dir === undefined) {
      return; // Invalid
    }

    const isExists = await promisify(fs.exists)(dir);
    if (!isExists) {
      await promisify(fs.mkdir)(dir);
    }

    const path = join(dir, "installations.json");
    await writeInstallations(path, { installations });
  });
};

export { setup };
