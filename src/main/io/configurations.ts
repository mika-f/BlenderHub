import type { AsyncSchema } from "ajv";

import Ajv from "ajv";
import fs from "fs";
import { promisify } from "util";

import type { IConfiguration } from "main/schema/configuration";

import { getDefaultUserDataDirectory } from "main/io/directory";
import { schema } from "main/schema/configuration";

const readConfiguration = async (path: string): Promise<IConfiguration> => {
  const validator = new Ajv().compile({ ...(await schema()), $async: true } as AsyncSchema);
  const configuration = await promisify(fs.readFile)(path).then((w) => JSON.parse(w.toString()));

  return validator(configuration)
    .then((w) => w as IConfiguration)
    .catch(() => ({ version: "1.0", libraryPath: getDefaultUserDataDirectory() } as IConfiguration));
};

const writeConfiguration = async (path: string, configuration: IConfiguration): Promise<void> => {
  await promisify(fs.writeFile)(path, JSON.stringify(configuration));
};

export { readConfiguration, writeConfiguration };
