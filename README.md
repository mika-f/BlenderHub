# Blender Hub

Blender Hub is an application that could install, uninstall, manage Blender versions, and associate .blend extensions with a specific version.

## Features

- install / uninstall Blender of the stable, nightly (daily), and experimental builds from within the app
- add existing Blender to the app
- switch Blender to launch by default with one-click
- cross-platform, it supports Windows, Linux, and macOS
- supports version selector that likes Microsoft Visual Studio

## Development

### Requirements

- Node.js 14.x
- Yarn 1.x

### Commands

- `yarn start` : start Blender Hub from source code
- `yarn lint` : lining and formatting source code by eslint and prettier
- `yarn make` : make distributable packages for all platform (**NOTE**: Builds other than the OS on which the build is normally performed may fail.)

## License

MIT by [@6jz](https://twitter.com/6jz)
