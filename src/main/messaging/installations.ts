// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcMain } from "electron";
import { spawn } from "child_process";
import fs from "fs";
import { dirname, join } from "path";
import { promisify } from "util";

import type { Installation, Installations } from "shared/messaging/installations";

import { readInstallations, writeInstallations } from "main/io/installations";
import { getDefaultUserDataDirectory } from "main/io/directory";
import {
  IPC_EVENT_NAME_EXECUTE_INSTALLATION,
  IPC_EVENT_NAME_FETCH_INSTALLATIONS,
  IPC_EVENT_NAME_FLUSH_INSTALLATIONS,
} from "shared/messaging/installations";

const setup = () => {
  ipcMain.handle(IPC_EVENT_NAME_EXECUTE_INSTALLATION, async (_, { installation }: { installation: Installation }) => {
    const isExists = await promisify(fs.exists)(installation.executable);
    if (!isExists) {
      return;
    }

    const cwd = dirname(installation.executable);

    spawn(installation.executable, { cwd, detached: true, stdio: "ignore" });
  });

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
