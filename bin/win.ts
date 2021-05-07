// eslint-disable-next-line import/no-extraneous-dependencies
const installer = require("electron-winstaller");
const path = require("path");

const arch = process.env.BUILD_ARCH || "x64";

const run = async () => {
  try {
    await installer.createWindowsInstaller({
      appDirectory: `out/BlenderHub-win32-${arch}`,
      outputDirectory: `out/BlenderHub-Win32-${arch}-Installer`,
      authors: "Natsuneko Laboratory",
      exe: "BlenderHub.exe",
      name: "BlenderHub",
      iconUrl: path.resolve(__dirname, "..", "src", "assets", "BlenderHub.ico"),
      setupIcon: path.resolve(__dirname, "..", "src", "assets", "BlenderHub.ico"),
    });

    console.log("Build Successful");
  } catch (e) {
    console.error(`Error occurred: ${e}`);
  }
};

run()
  .then(() => {})
  .catch(() => {});
