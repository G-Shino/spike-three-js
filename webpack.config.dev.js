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
    shadow: "./src/ts/shadow.ts",
    cubes: "./src/ts/cubes.ts",
    fog: "./src/ts/fog.ts",
    worldPosition: "./src/ts/worldPosition.ts",
    objLoad: "./src/ts/objLoad.ts",
    mouseSelect: "./src/ts/mouseSelect.ts",
    classComponent: "./src/ts/classComponent.ts",
    math: "./src/ts/math",
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "./js/[name].js",
  },

  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".js", ".jpg"],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{ loader: "ts-loader" }],
      },
      {
        test: /\.(mp4|png|jpg)?$/,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.html?$/,
        use: [{ loader: "html-loader" }],
      },
      {
        test: /\.obj$/,
        use: [{ loader: "file-loader" }],
      },
    ],
  },

  devServer: {
    contentBase: path.join(__dirname, "./dist"),
    watchContentBase: true,
    open: true,
    port: 3000,
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/html/index.html",
      inject: "head",
      chunks: ["index"],
    }),
    new HtmlWebpackPlugin({
      filename: "earth.html",
      template: "./src/html/threePages.html",
      inject: "head",
      chunks: ["earth"],
    }),
    new HtmlWebpackPlugin({
      filename: "earthWithRotationCam.html",
      template: "./src/html/threePages.html",
      inject: "head",
      chunks: ["earthWithRotationCam"],
    }),
    new HtmlWebpackPlugin({
      filename: "geometory.html",
      template: "./src/html/threePages.html",
      inject: "head",
      chunks: ["geometory"],
    }),
    new HtmlWebpackPlugin({
      filename: "orbitControl.html",
      template: "./src/html/threePages.html",
      inject: "head",
      chunks: ["orbitControl"],
    }),
    new HtmlWebpackPlugin({
      filename: "shadow.html",
      template: "./src/html/threePages.html",
      inject: "head",
      chunks: ["shadow"],
    }),
    new HtmlWebpackPlugin({
      filename: "cubes.html",
      template: "./src/html/threePages.html",
      inject: "head",
      chunks: ["cubes"],
    }),
    new HtmlWebpackPlugin({
      filename: "fog.html",
      template: "./src/html/threePages.html",
      inject: "head",
      chunks: ["fog"],
    }),
    new HtmlWebpackPlugin({
      filename: "worldPosition.html",
      template: "./src/html/threePages.html",
      inject: "head",
      chunks: ["worldPosition"],
    }),
    new HtmlWebpackPlugin({
      filename: "objLoad.html",
      template: "./src/html/threePages.html",
      inject: "head",
      chunks: ["objLoad"],
    }),
    new HtmlWebpackPlugin({
      filename: "mouseSelect.html",
      template: "./src/html/threePages.html",
      inject: "head",
      chunks: ["mouseSelect"],
    }),
    new HtmlWebpackPlugin({
      filename: "classComponent.html",
      template: "./src/html/threePages.html",
      inject: "head",
      chunks: ["classComponent"],
    }),
    new HtmlWebpackPlugin({
      filename: "math.html",
      template: "./src/html/threePages.html",
      inject: "head",
      chunks: ["math"],
    }),
  ],
};
