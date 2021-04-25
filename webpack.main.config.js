const path = require("path");

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
  resolve: {
    alias: {
      "main": path.resolve(__dirname, "src", "main"),
      "shared": path.resolve(__dirname, "src", "shared"),
    },
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"]
  },
};