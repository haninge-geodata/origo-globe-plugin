const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    './globe.js'
  ],
  module: {
    rules: [{
      test: /\.(js)$/,
      exclude: /node_modules/
    }]
  },
  externals: ['Origo'],
  resolve: {
    extensions: ['.*', '.js', '.scss'],
    fallback: { https: false, zlib: false, http: false, url: false },
    alias: {
      cesium: path.resolve('node_modules/cesium/Source/Cesium.js')
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      proj4: 'proj4'
    }),
    new webpack.DefinePlugin({
      CESIUM_BASE_URL: JSON.stringify('plugins/globe/cesiumassets')
    })
  ]
};
