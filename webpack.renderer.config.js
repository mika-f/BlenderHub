const path = require("path");

const rules = require("./webpack.rules");
const plugins = require("./webpack.plugins");

const CopyWebpackPlugin = require("copy-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

rules.push({
  test: /\.css$/,
  use: [
    { loader: "style-loader" },
    { loader: "css-loader" },
    { loader: "postcss-loader" }
  ],
});

const additionalPlugins = [
  new CopyWebpackPlugin({
    patterns: [
      { from: path.resolve(__dirname, "src", "static"), to: path.resolve(__dirname, ".webpack/renderer", "static")}
    ]
  }),
  // process.env.NODE_ENV !== "production" && new ReactRefreshWebpackPlugin(),
].filter(Boolean);

plugins.push(...additionalPlugins);

module.exports = {
  mode: process.env.NODE_ENV !== "production" ? "development" : "production",
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    alias: {
      "preload": path.resolve(__dirname, "src", "preload"),
      "renderer": path.resolve(__dirname, "src", "renderer"),
      "shared": path.resolve(__dirname, "src", "shared"),
    },
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css"]
  },
};
