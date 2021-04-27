type FilePath = { executable: string; version: string };

type MessagingSignature = {
  showBlenderSelectDialog: () => Promise<FilePath | null>;
  showDirectorySelectDialog: () => Promise<string | null>;
};

const IPC_EVENT_NAME_SHOW_BLENDER_SELECT_DIALOG = "show-blender-select-dialog";
const IPC_EVENT_NAME_SHOW_DIRECTORY_SELECT_DIALOG = "show-directory-select-dialog";

export type { FilePath, MessagingSignature };

export { IPC_EVENT_NAME_SHOW_BLENDER_SELECT_DIALOG, IPC_EVENT_NAME_SHOW_DIRECTORY_SELECT_DIALOG };
