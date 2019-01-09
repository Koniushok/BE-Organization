const HtmlWebPackPlugin = require("html-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const StatsWebpackPlugin = require("stats-webpack-plugin");
const DuplicatePackageCheckerWebpackPlugin = require("duplicate-package-checker-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");

const defaultPort = 3000;

const htmlPlugin = new HtmlWebPackPlugin({
  title: "Development",
  filename: "index.html",
  template: "./public/index.html",
  favicon: "./src/assets/images/favicon.ico"
});

const errorPlugin = new FriendlyErrorsWebpackPlugin({
  compilationSuccessInfo: {
    messages: [
      `You application is running on port ${process.env.PORT || defaultPort}`
    ],
    notes: ["Yeee compiled successfully"]
  }
});

const statsPlugin = new StatsWebpackPlugin("stats.json", {
  chunkModules: true,
  exclude: [/node_modules[\\\/]react/]
});

const packageChecker = new DuplicatePackageCheckerWebpackPlugin();

const terser = new TerserPlugin({
  cache: true,
  parallel: true,
  sourceMap: true
});

const hMR = new webpack.HotModuleReplacementPlugin();

module.exports = {
  entry: "./src/index",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "webpack.bundled.js"
  },
  devtool: "inline-source-map",
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
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              minimize: true
            }
          }
        ]
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
  optimization: {
    minimizer: [terser]
  },
  resolve: {
    alias: {
      Styles: path.resolve(__dirname, "src/assets/styles/")
    },
    extensions: [".wasm", ".mjs", ".js", ".json", ".jsx"]
  },
  devServer: {
    port: process.env.PORT || defaultPort,
    quiet: true
  },
  plugins: [errorPlugin, htmlPlugin, statsPlugin, packageChecker, hMR],
  profile: true
};
