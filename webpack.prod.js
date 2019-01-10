const webpack = require("webpack");
const merge = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");

const common = require("./webpack.config.js");

const terser = new TerserPlugin({
  cache: true,
  parallel: true,
  sourceMap: true
});

const definePlugin = new webpack.DefinePlugin({
  "process.env": {
    NODE_ENV: JSON.stringify("production")
  }
});

module.exports = merge(common, {
  mode: "production",
  stats: {
    colors: false,
    hash: true,
    timings: true,
    assets: true,
    chunks: true,
    chunkModules: true,
    modules: true,
    children: true
  },
  optimization: {
    minimizer: [terser],
    runtimeChunk: false,
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
          minChunks: 2
        }
      }
    }
  },
  plugins: [definePlugin]
});
