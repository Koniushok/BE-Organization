const webpack = require("webpack");
const merge = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MediaQueryPlugin = require("media-query-plugin");
const StatsWebpackPlugin = require("stats-webpack-plugin");

const common = require("./webpack.config.js");

const terser = new TerserPlugin({
  cache: true,
  parallel: true,
  sourceMap: true
});

const cssOptimizerPlugin = new OptimizeCSSAssetsPlugin();

const miniCssExtructPlugin = new MiniCssExtractPlugin({
  filename: "[name].css",
  chunkFilename: "[id].css"
});

const statsPlugin = new StatsWebpackPlugin("stats.json", {
  chunkModules: true,
  exclude: [/node_modules[\\\/]react/]
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
    minimizer: [terser, cssOptimizerPlugin],
    runtimeChunk: false,
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "BE_organization",
          chunks: "all",
          minChunks: 2
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              minimize: true
            }
          },
          MediaQueryPlugin.loader
        ]
      }
    ]
  },
  plugins: [definePlugin, statsPlugin, miniCssExtructPlugin]
});
