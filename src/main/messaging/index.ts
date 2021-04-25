import { setup as setupInstallations } from "main/messaging/installations";
import { setup as setupReleases } from "main/messaging/releases";

const registerIpcMessagingApis = () => {
  setupInstallations();
  setupReleases();
};

export { registerIpcMessagingApis };
