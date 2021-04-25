import type { MessagingSignature as DialogsSignature } from "shared/messaging/dialogs";
import type { MessagingSignature as InstallationsSignature } from "shared/messaging/installations";
import type { MessagingSignature as ReleasesSignature } from "shared/messaging/releases";

type Messaging = {
  dialogs: DialogsSignature;
  installations: InstallationsSignature;
  releases: ReleasesSignature;
};

declare global {
  interface Window {
    messaging: Messaging;
  }
}
