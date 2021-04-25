// eslint-disable-next-line import/no-extraneous-dependencies
import { contextBridge } from "electron";

import { signatures as dialogs } from "./dialogs";
import { signatures as installations } from "./installations";
import { signatures as releases } from "./releases";

const signatures: typeof window.messaging = {
  dialogs,
  installations,
  releases,
};

contextBridge.exposeInMainWorld("messaging", signatures);
