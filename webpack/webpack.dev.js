/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');
const { HotModuleReplacementPlugin } = require('webpack');
const FlowWebpackPlugin = require('flow-webpack-plugin');
const common = require('./webpack.config.js');

const defaultPort = 3000;

const flowPlugin = new FlowWebpackPlugin({
  flowPath: require.main.require('flow-bin'),
});

module.exports = merge(common, {
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['eslint-loader', 'stylelint-custom-processor-loader'],
      },
    ],
  },
  plugins: [new HotModuleReplacementPlugin(), flowPlugin],
  devServer: {
    port: process.env.PORT || defaultPort,
    stats: {
      colors: true,
      hash: false,
      version: false,
      timings: false,
      assets: false,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: true,
      errorDetails: true,
      warnings: true,
      publicPath: false,
    },
    hot: true,
  },
});
