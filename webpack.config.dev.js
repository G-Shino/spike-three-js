const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    index: "./src/index.ts",
    earth: "./src/earth.ts",
    geometory: "./src/geometory.ts",
    orbitControl: "./src/orbitControl.ts"
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
      }
    ]
  },

  devServer: {
    contentBase: path.join(__dirname, "./dist"),
    watchContentBase: true,
    port: 3000
  }
};
