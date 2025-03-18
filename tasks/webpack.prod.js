const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const common = require('./webpack.common');


const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';

module.exports = merge(common, {
  optimization: {
    nodeEnv: 'production',
    minimize: true
  },
  performance: {
    hints: false
  },
  output: {
    path: `${__dirname}/../build`,
    filename: 'globe.min.js',
    libraryTarget: 'var',
    libraryExport: 'default',
    library: 'Globe'
  },
  devtool: false,
  mode: 'production',
  module: {
    rules: [{
      test: /\.(sc|c)ss$/,
      use: [{
        loader: MiniCssExtractPlugin.loader
      },
      {
        loader: 'css-loader'
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: [
            require('autoprefixer')({
              env: '> 0.5%, last 2 versions, Firefox ESR, not dead, not ie <= 10'
            })
          ]
        }
      },
      {
        loader: 'sass-loader'
      }
      ]
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '../build/globe.css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.join(cesiumSource, cesiumWorkers), to: `${__dirname}/../build/cesiumassets/Workers` },
        { from: path.join(cesiumSource, 'Widgets'), to: `${__dirname}/../build/cesiumassets/Widgets` },
        { from: path.join(cesiumSource, 'Assets'), to: `${__dirname}/../build/cesiumassets/Assets` },
        { from: path.join(cesiumSource, 'ThirdParty'), to: `${__dirname}/../build/cesiumassets/ThirdParty` }
      ]
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ]
});
