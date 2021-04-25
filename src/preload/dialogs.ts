import type { OpenDialogReturnValue } from "electron";

// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer } from "electron";

import type { FilePath, MessagingSignature } from "shared/messaging/dialogs";
import type { MessagingSignature as PathsSignature } from "shared/messaging/paths";

import { IPC_EVENT_NAME_SHOW_BLENDER_SELECT_DIALOG } from "shared/messaging/dialogs";
import { IPC_EVENT_NAME_DETECT_BLENDER_VERSION, IPC_EVENT_NAME_IS_VALID_BLENDER_PATH } from "shared/messaging/paths";

type PathReturnOf<T extends keyof PathsSignature> = ReturnType<PathsSignature[T]>;

const signatures: MessagingSignature = {
  showBlenderSelectDialog: async (): Promise<FilePath | null> => {
    const name = (await ipcRenderer.invoke(IPC_EVENT_NAME_SHOW_BLENDER_SELECT_DIALOG)) as OpenDialogReturnValue;

    if (name.canceled) {
      return null;
    }

    const path = name.filePaths[0];

    const isValid = (await ipcRenderer.invoke(IPC_EVENT_NAME_IS_VALID_BLENDER_PATH, { path })) as boolean;
    if (!isValid) {
      return null;
    }

    const version = (await ipcRenderer.invoke(IPC_EVENT_NAME_DETECT_BLENDER_VERSION, {
      path,
    })) as PathReturnOf<"detectBlenderVersion">;

    return { executable: path, version };
  },
};

export { signatures };
