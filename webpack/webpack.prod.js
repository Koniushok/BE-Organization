const webpack = require("webpack");
const merge = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

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

const copyPlugin = new CopyWebpackPlugin([
  {
    from: "src/static/normalize.min.css",
    to: "src/static/normalize.min.css"
  }
]);

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
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
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|svg)$/,
        loader: "image-webpack-loader",
        enforce: "pre"
      }
    ]
  },
  optimization: {
    minimize: true,
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
  plugins: [definePlugin, copyPlugin]
});
