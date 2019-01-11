/* eslint-disable import/no-extraneous-dependencies */
const HtmlWebPackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const DuplicatePackageCheckerWebpackPlugin = require('duplicate-package-checker-webpack-plugin');
const path = require('path');

const htmlPlugin = new HtmlWebPackPlugin({
  filename: 'index.html',
  template: './public/index.html',
  favicon: './src/assets/images/favicon.ico',
});

const errorPlugin = new FriendlyErrorsWebpackPlugin({
  compilationSuccessInfo: {
    messages: ['You application is running...'],
    notes: ['Yeee compiled successfully'],
  },
});

const packageChecker = new DuplicatePackageCheckerWebpackPlugin();

module.exports = {
  entry: './src/index',
  output: {
    path: path.join(__dirname, '..', 'build'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|svg|jpe?g)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  },
  resolve: {
    alias: {
      Styles: path.resolve(__dirname, 'src/assets/styles/'),
    },
    extensions: ['.js', '.json', '.jsx'],
  },
  plugins: [errorPlugin, htmlPlugin, packageChecker],
  profile: true,
};
