type MessagingSignature = {
  detectBlenderVersion: (args: { path: string }) => string;
  isValidBlenderPath: (args: { path: string }) => boolean;
  getDefaultLibraryPath: () => string;
};

const IPC_EVENT_NAME_DETECT_BLENDER_VERSION = "detect-blender-version";
const IPC_EVENT_NAME_IS_VALID_BLENDER_PATH = "is-valid-blender-path";
const IPC_EVENT_NAME_GET_DEFAULT_LIBRARY_PATH = "get-default-library-path";

export type { MessagingSignature };
export {
  IPC_EVENT_NAME_DETECT_BLENDER_VERSION,
  IPC_EVENT_NAME_IS_VALID_BLENDER_PATH,
  IPC_EVENT_NAME_GET_DEFAULT_LIBRARY_PATH,
};
