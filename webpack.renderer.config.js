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
      { from: path.resolve(__dirname, "src", "assets"), to: path.resolve(__dirname, ".webpack/renderer", "assets")}
    ]
  }),
  process.env.NODE_ENV !== "production" && new ReactRefreshWebpackPlugin(),
].filter(Boolean);

plugins.push(...additionalPlugins);

module.exports = {
  mode: process.env.NODE_ENV !== "production" ? "development" : "production",
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css"]
  },
};
