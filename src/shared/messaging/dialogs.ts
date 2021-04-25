type FilePath = { executable: string; version: string };

type MessagingSignature = {
  showBlenderSelectDialog: () => Promise<FilePath | null>;
};

const IPC_EVENT_NAME_SHOW_BLENDER_SELECT_DIALOG = "show-blender-select-dialog";

export type { FilePath, MessagingSignature };

export { IPC_EVENT_NAME_SHOW_BLENDER_SELECT_DIALOG };
