// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcMain } from "electron";

import { fetchReleases } from "main/net/version-fetcher";
import { getPlatform } from "main/platform";
import { IPC_EVENT_NAME } from "shared/messaging/releases";

const setup = () => {
  ipcMain.handle(IPC_EVENT_NAME, async (_, { branch }: { branch: string }) => {
    const platform = getPlatform();
    const versions = await fetchReleases(branch as any, platform);

    return versions;
  });
};

export { setup };
