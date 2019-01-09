const HtmlWebPackPlugin = require("html-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const DuplicatePackageCheckerWebpackPlugin = require("duplicate-package-checker-webpack-plugin");
const path = require("path");

const htmlPlugin = new HtmlWebPackPlugin({
  filename: "index.html",
  template: "./public/index.html",
  favicon: "./src/assets/images/favicon.ico"
});

const errorPlugin = new FriendlyErrorsWebpackPlugin({
  compilationSuccessInfo: {
    messages: [`You application is running...`],
    notes: ["Yeee compiled successfully"]
  }
});

const packageChecker = new DuplicatePackageCheckerWebpackPlugin();

module.exports = {
  entry: "./src/index",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "webpack.bundled.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(csv|tsv)$/,
        use: ["csv-loader"]
      },
      {
        test: /\.xml$/,
        use: ["xml-loader"]
      }
    ]
  },
  resolve: {
    alias: {
      Styles: path.resolve(__dirname, "src/assets/styles/")
    },
    extensions: [".wasm", ".mjs", ".js", ".json", ".jsx"]
  },
  plugins: [errorPlugin, htmlPlugin, packageChecker],
  profile: true
};
