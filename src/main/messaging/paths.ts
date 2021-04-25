// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcMain } from "electron";
import fs from "fs";
import { basename, dirname, join, parse } from "path";
import { promisify } from "util";

import { getDefaultUserDataDirectory } from "main/io/directory";
import {
  IPC_EVENT_NAME_DETECT_BLENDER_VERSION,
  IPC_EVENT_NAME_GET_DEFAULT_LIBRARY_PATH,
  IPC_EVENT_NAME_IS_VALID_BLENDER_PATH,
} from "shared/messaging/paths";

const setup = () => {
  ipcMain.handle(IPC_EVENT_NAME_GET_DEFAULT_LIBRARY_PATH, () => getDefaultUserDataDirectory());

  ipcMain.handle(IPC_EVENT_NAME_IS_VALID_BLENDER_PATH, async (_, { path }: { path: string }) => {
    const { name } = parse(path);
    if (name !== "blender" && name !== "Blender") {
      return false;
    }

    // Should I check one or more blender files?
    return true;
  });

  ipcMain.handle(IPC_EVENT_NAME_DETECT_BLENDER_VERSION, async (_, { path: blender }: { path: string }) => {
    const appRoot = dirname(blender);
    const paths = await promisify(fs.readdir)(appRoot);

    for (let i = 0; i < paths.length; i += 1) {
      const path = join(appRoot, paths[i]);
      // eslint-disable-next-line no-await-in-loop
      const isDir = (await promisify(fs.stat)(path)).isDirectory();

      if (isDir && basename(path).match(/^\d+\.\d+$/)) {
        return basename(path);
      }
    }

    return "unknown";
  });
};

export { setup };
