const webpack = require('webpack')
const path = require('path')
const HtmlWebPackPlugin = require("html-webpack-plugin");

// Is the current build a development build
const IS_DEV = process.env.NODE_ENV === "dev";

const config = {
  entry: path.resolve(__dirname, './src/sketch.js'),
  devtool: 'eval-source-map',
  watch: true,
  output: {
    path: path.resolve(__dirname, './bin'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: 'bin'
    // port: 3000
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "src/index.html",
      filename: "index.html"
    })
  ]
  // resolve: {
  //   modules: [path.resolve('./node_modules'), path.resolve('./src')],
  //   extensions: ['.json', '.js']
  // }
}

module.exports = config
