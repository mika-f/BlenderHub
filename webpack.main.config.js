const path = require("path");

const CopyWebpackPlugin = require("copy-webpack-plugin");

const plugins = [];

const additionalPlugins = [
  new CopyWebpackPlugin({
    patterns: [
      {context: path.resolve(__dirname, "src/main/schema"), from: "*.json", to: path.resolve(__dirname, ".webpack/main")},
      {context: path.resolve(__dirname, "src/assets"), from: "**/*.*", to: path.resolve(__dirname, ".webpack/assets")},
    ]
  }),
  // process.env.NODE_ENV !== "production" && new ReactRefreshWebpackPlugin(),
].filter(Boolean);

plugins.push(...additionalPlugins);


module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: "./src/main/index.ts",
  mode: process.env.NODE_ENV !== "production" ? "development" : "production",
  // Put your normal webpack config below here
  module: {
    rules: require("./webpack.rules"),
  },
  plugins: plugins,
  resolve: {
    alias: {
      "main": path.resolve(__dirname, "src", "main"),
      "shared": path.resolve(__dirname, "src", "shared"),
    },
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"]
  },
};