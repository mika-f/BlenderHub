// eslint-disable-next-line import/no-extraneous-dependencies
import { app, BrowserWindow } from "electron";
// eslint-disable-next-line import/no-extraneous-dependencies
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from "electron-devtools-installer";
import isDev from "electron-is-dev";
import windowStateKeeper from "electron-window-state";

import { runUpdater } from "./auto-update";
import { registerIpcMessagingApis } from "./messaging";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line global-require
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = (): void => {
  const previousState = windowStateKeeper({
    defaultHeight: 600,
    defaultWidth: 850,
  });

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    x: previousState.x,
    y: previousState.y,
    height: previousState.height,
    width: previousState.width,
    minHeight: 600,
    minWidth: 850,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      contextIsolation: true,
      worldSafeExecuteJavaScript: true,
    },
  });

  previousState.manage(mainWindow);

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  if (isDev) {
    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // install extensions
    installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS]).then(() => {});
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

runUpdater();
registerIpcMessagingApis();
