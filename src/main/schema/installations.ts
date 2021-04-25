import fs from "fs";
import path from "path";
import { promisify } from "util";

import { Branch } from "shared/branch";

interface IInstallation {
  version: string;
  branch: Branch;
  executable: string;
}

interface IInstallations {
  installations: IInstallation[];
}

const schema = () =>
  promisify(fs.readFile)(path.join(__dirname, "./installations.json")).then((w) => JSON.parse(w.toString()));

export type { IInstallations };
export { schema };
