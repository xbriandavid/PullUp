const { resolve } = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    mode: "development",
    entry: {
        Index:'./src/index.tsx',
      },
    output: {
      path: `${__dirname}/dist`,
      filename: '[name].bundle.js',
    },
    resolve: {
        extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
    },
    module: {
      rules: [
        {
            test: /\.(ts|tsx)$/,
            loader: "ts-loader",
          },
        {
          test: /\.svg$/,
          use: {
            loader: 'file-loader'
          }
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
        {
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        },
      ]
    },
    devServer: {
      historyApiFallback: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: `${resolve(__dirname, "src", "index.html")}`
      }),
      new CleanWebpackPlugin()
    ]
  };
  