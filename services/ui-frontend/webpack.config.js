const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    mode: "development",
    entry: {
        app:'./src/components/index.tsx'},
    output: {
      path: resolve(__dirname, 'build'),
      filename: 'bundle.js'
    },
    resolve: {
        extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    },
    module: {
      rules: [
        {
            test: /\.(ts|tsx)$/,
            loader: "awesome-typescript-loader",
          },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: `${resolve(__dirname, "src", "components", "index.html")}`
      })
    ]
  };
  