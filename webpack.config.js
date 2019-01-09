const HtmlWebPackPlugin = require("html-webpack-plugin");
const StatsPlugin = require("stats-webpack-plugin");
const path = require("path");

const defaultPort = 3000;

const htmlPlugin = new HtmlWebPackPlugin({
  filename: "index.html",
  template: "./public/index.html"
});

const statsPlugin = new StatsPlugin("stats.json", {
  chunkModules: true,
  exclude: [/node_modules[\\\/]react/]
});

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
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              minimize: true
            }
          }
        ]
      }
    ]
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
  plugins: [htmlPlugin, statsPlugin],
  profile: true
};
