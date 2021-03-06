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
    math: "./src/ts/math.ts",
    math2: "./src/ts/math2.ts",
    scroll: "./src/ts/scroll.ts",
    shader: "./src/ts/shader.ts",
    shader2: "./src/ts/shader2.ts",
    sphere: "./src/ts/sphere.ts",
    animation: "./src/ts/animation.ts",
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
      {
        test: /\.(vert|frag|glsl)$/,
        use: [{ loader: "webpack-glsl-loader" }],
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
    new HtmlWebpackPlugin({
      filename: "math2.html",
      template: "./src/html/threePages.html",
      inject: "head",
      chunks: ["math2"],
    }),
    new HtmlWebpackPlugin({
      filename: "scroll.html",
      template: "./src/html/threePages.html",
      inject: "head",
      chunks: ["scroll"],
    }),
    new HtmlWebpackPlugin({
      filename: "shader.html",
      template: "./src/html/threePages.html",
      inject: "head",
      chunks: ["shader"],
    }),
    new HtmlWebpackPlugin({
      filename: "shader2.html",
      template: "./src/html/threePages.html",
      inject: "head",
      chunks: ["shader2"],
    }),
    new HtmlWebpackPlugin({
      filename: "sphere.html",
      template: "./src/html/threePages.html",
      inject: "head",
      chunks: ["sphere"],
    }),
    new HtmlWebpackPlugin({
      filename: "animation.html",
      template: "./src/html/threePages.html",
      inject: "head",
      chunks: ["animation"],
    }),
  ],
};
