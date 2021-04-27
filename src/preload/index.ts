// eslint-disable-next-line import/no-extraneous-dependencies
import { contextBridge } from "electron";

import { signatures as configuration } from "./configuration";
import { signatures as dialogs } from "./dialogs";
import { signatures as installations } from "./installations";
import { signatures as releases } from "./releases";

const signatures: typeof window.messaging = {
  configuration,
  dialogs,
  installations,
  releases,
};

contextBridge.exposeInMainWorld("messaging", signatures);
