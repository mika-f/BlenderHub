import type { AsyncSchema } from "ajv";

import Ajv from "ajv";
import fs from "fs";
import { promisify } from "util";

import type { IInstallations } from "main/schema/installations";

import { schema } from "main/schema/installations";

const readInstallations = async (path: string): Promise<IInstallations> => {
  const validator = new Ajv().compile({ ...(await schema()), $async: true } as AsyncSchema);
  const configuration = await promisify(fs.readFile)(path).then((w) => JSON.parse(w.toString()));

  return validator(configuration)
    .then((w) => w as IInstallations)
    .catch(() => ({ installations: [] }));
};

const writeInstallations = async (path: string, installations: IInstallations): Promise<void> => {
  await promisify(fs.writeFile)(path, JSON.stringify(installations));
};

export { readInstallations, writeInstallations };
