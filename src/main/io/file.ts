import AdmZip from "adm-zip";
import extractDmg from "extract-dmg";
import fs from "fs";
// import { createDecompressor } from "lzma-native";
import path from "path";
// import tar from "tar";
import { promisify } from "util";
import { getDefaultUserDataDirectory } from "./directory";

const decompressDmg = async (src: string, dest: string): Promise<void> => {
  await extractDmg(src, dest);
};

const decompressTarball = async (_src: string, _dest: string): Promise<void> => {
  // const rs = fs.createReadStream(src);
  // const tf = path.join(dest, "temporary.tat");
  // const ws = fs.createWriteStream(tf);
  // const decompressor = createDecompressor();
  // rs.pipe(decompressor).pipe(ws);
  // await tar.extract({ file: tf, cwd: dest });
};

const decompressZip = (src: string, dest: string): Promise<void> =>
  new Promise((resolve, reject) => {
    const zip = new AdmZip(src);
    zip.extractAllToAsync(dest, false, (err) => {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  });

const decompress = async (src: string, dest: string): Promise<void> => {
  const isExists = await promisify(fs.exists)(src);
  if (!isExists) {
    return;
  }

  const ext = path.extname(src).substring(1);

  switch (ext) {
    case "dmg":
      decompressDmg(src, dest);
      break;

    case "tar.xz":
      decompressTarball(src, dest);
      break;

    case "zip":
      decompressZip(src, dest);
      break;

    default:
      break;
  }
};

const getConfigurationsFilePath = (): string => {
  const dir = getDefaultUserDataDirectory();
  return path.join(dir!, "configurations.json");
};

export { decompress, getConfigurationsFilePath };
