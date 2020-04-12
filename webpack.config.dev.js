const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/ts/index.ts",
    earth: "./src/ts/earth.ts",
    earthWithRotationCam: "./src/ts/earthWithRotationCam.ts",
    geometory: "./src/ts/geometory.ts",
    orbitControl: "./src/ts/orbitControl.ts",
    shadow: "./src/ts/shadow.ts"
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "./js/[name].js"
  },

  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".js", ".jpg"]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{ loader: "ts-loader" }]
      },
      {
        test: /\.(mp4|png|jpg)?$/,
        use: [
          {
            loader: "file-loader"
          }
        ]
      },
      {
        test: /\.html?$/,
        use: [{ loader: "html-loader" }]
      }
    ]
  },

  devServer: {
    contentBase: path.join(__dirname, "./dist"),
    watchContentBase: true,
    open: true,
    port: 3000
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/html/index.html",
      inject: "head",
      chunks: ["index"]
    }),
    new HtmlWebpackPlugin({
      filename: "earth.html",
      template: "./src/html/three_pages.html",
      inject: "head",
      chunks: ["earth"]
    }),
    new HtmlWebpackPlugin({
      filename: "earthWithRotationCam.html",
      template: "./src/html/three_pages.html",
      inject: "head",
      chunks: ["earthWithRotationCam"]
    }),
    new HtmlWebpackPlugin({
      filename: "geometory.html",
      template: "./src/html/three_pages.html",
      inject: "head",
      chunks: ["geometory"]
    }),
    new HtmlWebpackPlugin({
      filename: "orbitControl.html",
      template: "./src/html/three_pages.html",
      inject: "head",
      chunks: ["orbitControl"]
    }),
    new HtmlWebpackPlugin({
      filename: "shadow.html",
      template: "./src/html/three_pages.html",
      inject: "head",
      chunks: ["shadow"]
    })
  ]
};
