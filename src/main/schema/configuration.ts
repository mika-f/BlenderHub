import fs from "fs";
import path from "path";
import { promisify } from "util";

interface IConfiguration {
  version: "1.0";
  libraryPath: string;
}

const schema = () =>
  promisify(fs.readFile)(path.join(__dirname, "./configuration.json")).then((w) => JSON.parse(w.toString()));

export type { IConfiguration };
export { schema };
