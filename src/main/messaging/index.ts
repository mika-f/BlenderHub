import { setup as setupDialogs } from "main/messaging/dialogs";
import { setup as setupInstallations } from "main/messaging/installations";
import { setup as setupPaths } from "main/messaging/paths";
import { setup as setupReleases } from "main/messaging/releases";

const registerIpcMessagingApis = () => {
  setupDialogs();
  setupInstallations();
  setupPaths();
  setupReleases();
};

export { registerIpcMessagingApis };
