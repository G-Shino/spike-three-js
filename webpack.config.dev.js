const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "./js/bundle.js"
  },

  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".js"]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{ loader: "ts-loader" }]
      }
    ]
  },

  devServer: {
    open: true,
    contentBase: path.join(__dirname, "./dist"),
    watchContentBase: true,
    port: 3000
  }
};
