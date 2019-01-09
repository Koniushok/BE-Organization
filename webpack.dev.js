const webpack = require("webpack");
const merge = require("webpack-merge");
const hMR = new webpack.HotModuleReplacementPlugin();

const common = require("./webpack.config.js");

const defaultPort = 3000;

module.exports = merge(common, {
  devtool: "inline-source-map",
  mode: "development",
  devServer: {
    port: process.env.PORT || defaultPort,
    quiet: true
  },
  plugins: [hMR]
});
