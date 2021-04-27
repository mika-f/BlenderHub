interface IConfiguration {
  version: "1.0";
  libraryPath: string;
}

type MessagingSignature = {
  readConfiguration: () => Promise<IConfiguration>;
  writeConfiguration: (configuration: IConfiguration) => void;
};

const IPC_EVENT_NAME_READ_CONFIGURATION = "read-configuration";
const IPC_EVENT_NAME_WRITE_CONFIGURATION = "write-configuration";

export type { IConfiguration, MessagingSignature };

export { IPC_EVENT_NAME_READ_CONFIGURATION, IPC_EVENT_NAME_WRITE_CONFIGURATION };
