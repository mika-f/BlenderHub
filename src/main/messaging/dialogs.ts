// eslint-disable-next-line import/no-extraneous-dependencies
import { dialog, ipcMain, BrowserWindow } from "electron";
import { IPC_EVENT_NAME_SHOW_BLENDER_SELECT_DIALOG } from "shared/messaging/dialogs";

const setup = () => {
  ipcMain.handle(IPC_EVENT_NAME_SHOW_BLENDER_SELECT_DIALOG, async (event) => {
    const window = BrowserWindow.fromWebContents(event.sender);
    const name = await dialog.showOpenDialog(window!, {
      properties: ["openFile"],
      title: "Select the Blender you wish to add",
      defaultPath: ".",
      filters: [{ name: "Executables", extensions: ["*"] }],
    });

    return name;
  });
};

export { setup };
