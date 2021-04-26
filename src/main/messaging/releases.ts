// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserWindow, ipcMain } from "electron";
import { download } from "electron-dl";
import fs from "fs";
import os from "os";
import { join } from "path";
import { promisify } from "util";

import { readConfiguration } from "main/io/configurations";
import { decompress, getConfigurationsFilePath } from "main/io/file";
import { makeDownloadUrl } from "main/io/url";
import { fetchReleases } from "main/net/version-fetcher";
import { getPlatform } from "main/platform";
import { Branch } from "shared/branch";
import {
  IPC_EVENT_NAME_DOWNLOAD_BLENDER,
  IPC_EVENT_NAME_DOWNLOAD_BLENDER_COMPLETED,
  IPC_EVENT_NAME_DOWNLOAD_BLENDER_PROGRESS,
  IPC_EVENT_NAME_EXTRACT_DOWNLOADED_RELEASE,
  IPC_EVENT_NAME_FETCH_BLENDER_RELEASES,
} from "shared/messaging/releases";

const setup = () => {
  ipcMain.handle(
    IPC_EVENT_NAME_DOWNLOAD_BLENDER,
    async (_, { branch, version, url: baseUrl }: { branch: Branch; version: string; url: string }) => {
      const win = BrowserWindow.getFocusedWindow();
      const dir = await promisify(fs.mkdtemp)(join(os.tmpdir(), "blender-hub"));
      const url = makeDownloadUrl(baseUrl, branch, version);

      await download(win!, url, {
        directory: dir,
        onProgress: ({ percent }) => {
          win?.webContents.send(IPC_EVENT_NAME_DOWNLOAD_BLENDER_PROGRESS, { progress: percent });
        },
        onCompleted: ({ path }) => {
          win?.webContents.send(IPC_EVENT_NAME_DOWNLOAD_BLENDER_COMPLETED, { path });
        },
      });
    }
  );

  ipcMain.handle(
    IPC_EVENT_NAME_EXTRACT_DOWNLOADED_RELEASE,
    async (_, { path, version }: { path: string; version: string }) => {
      const configuration = await readConfiguration(getConfigurationsFilePath());
      const dest = join(configuration.libraryPath, "versions", version);
      await decompress(path, dest);

      return dest;
    }
  );

  ipcMain.handle(IPC_EVENT_NAME_FETCH_BLENDER_RELEASES, async (_, { branch }: { branch: Branch }) => {
    const platform = getPlatform();
    const versions = await fetchReleases(branch, platform);

    return versions;
  });
};

export { setup };
