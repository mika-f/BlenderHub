import { Branch } from "shared/branch";

type Installation = {
  version: string;
  branch: Branch;
  executable: string;
};

type Installations = Installation[];

type MessagingSignature = {
  fetchInstallations: () => Promise<Installations>;
};

const IPC_EVENT_NAME = "fetch-blender-installations";

export type { Installation, Installations, MessagingSignature };

export { IPC_EVENT_NAME };
