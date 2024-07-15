const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';

module.exports = merge(common, {
  output: {
    path: `${__dirname}/../../origo/plugins/globe`,
    publicPath: '/build',
    filename: 'globe.js',
    libraryTarget: 'var',
    libraryExport: 'default',
    library: 'Globe'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(s(a|c)ss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  devServer: {
    static: './',
    port: 9009,
    devMiddleware: {
      writeToDisk: true
    }
  },
  plugins: [
    new WriteFilePlugin({
      test: /^(?!.*(hot)).*/,
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.join(cesiumSource, cesiumWorkers), to: `${__dirname}/../../origo/plugins/globe/cesiumassets/Workers` },
        { from: path.join(cesiumSource, 'Widgets'), to: `${__dirname}/../../origo/plugins/globe/cesiumassets/Widgets` },
        { from: path.join(cesiumSource, 'Assets'), to: `${__dirname}/../../origo/plugins/globe/cesiumassets/Assets` },
        { from: path.join(cesiumSource, 'ThirdParty'), to: `${__dirname}/../../origo/plugins/globe/cesiumassets/ThirdParty` }
      ]
    })
  ]
});
