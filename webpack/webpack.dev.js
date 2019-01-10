const merge = require("webpack-merge");
const { HotModuleReplacementPlugin } = require("webpack");
const common = require("./webpack.config.js");

const defaultPort = 3000;

module.exports = merge(common, {
  devtool: "inline-source-map",
  mode: "development",

  plugins: [new HotModuleReplacementPlugin()],
  devServer: {
    port: process.env.PORT || defaultPort,
    quiet: true,
    hot: true
  }
});
