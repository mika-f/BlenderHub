import { Branch } from "shared/branch";

type Installation = {
  version: string;
  branch: Branch;
  executable: string;
};

type Installations = Installation[];

type MessagingSignature = {
  fetchInstallations: () => Promise<Installations>;
  flushInstallations: ({ installations }: { installations: Installations }) => Promise<void>;
};

const IPC_EVENT_NAME_FETCH_INSTALLATIONS = "fetch-blender-installations";
const IPC_EVENT_NAME_FLUSH_INSTALLATIONS = "flush-blender-installations";

export type { Installation, Installations, MessagingSignature };

export { IPC_EVENT_NAME_FETCH_INSTALLATIONS, IPC_EVENT_NAME_FLUSH_INSTALLATIONS };
