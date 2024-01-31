const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const autoprefixer = require("autoprefixer");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/js/main.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    static: path.resolve(__dirname, "dist"),
    port: 8090,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new CopyPlugin({
      patterns: [{ from: "./src/assets", to: "assets" }]
    })
  ],
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          "style-loader", // injects styles into DOM
          "css-loader", // translates CSS into CommonJS
          {
            loader: "postcss-loader", // postcss loader
            options: {
              postcssOptions: {
                plugins: [autoprefixer]
              }
            }
          },
          "sass-loader" // compiles Sass to CSS for use bootstrap icons
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
