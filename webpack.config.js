'use strict'

const path = require('path');
const webpack = require("webpack");
const env = process.env.NODE_ENV;

let config = {
  entry: {
    app :'./src/ts/entrypoint.ts'
  },
  output: {
    filename: 'js/bundle.js'
  },
  resolve: {
    extensions: ['', '.ts', '.webpack.js', '.web.js', '.js']
  },

  module: {
    loaders: [
      { test: /\.ts$/, loader: 'awesome-typescript-loader'}
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ]
}

if (env === 'production') {
  // JS圧縮
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }));
} else {
  // ソースマップ
  config.devtool = 'source-map';
}

module.exports = config;