const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");

const htmlPlugin = new HtmlWebPackPlugin({
  filename: "index.html",
  template: "./public/index.html"
});

module.exports = {
  entry: "./src/index",
  output: {
    path: path.resolve(__dirname, "dist"),
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
    }
  },
  plugins: [htmlPlugin]
};
