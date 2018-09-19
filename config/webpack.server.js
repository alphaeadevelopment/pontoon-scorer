/* eslint-disable */
const fs = require('fs');
const path = require('path')
const webpack = require('webpack')

const VENDOR_LIBS = [
  'babel-polyfill',
  'babel-register',
  'body-parser',
  'classnames',
  'immutability-helper',
  'react-dom',
  'react-hot-loader',
  'react-redux',
  'react-router-dom',
  'react',
  'redux-thunk',
  'redux',
  'reselect',
  'uuid',
];

const babelExclude = /node_modules/
const outputPath = path.join(__dirname, '../dist-server');

const alias = {
  // 'styles': path.join(__dirname, '../src/client/styles'),
}

const publicPath = path.join(__dirname, '../../dist');
const config = {
  entry: path.join(__dirname, '../src/server', 'main.js'),
  output: {
    path: outputPath,
    filename: 'index.js',
    publicPath,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.jsx?$/,
            use: ['babel-loader'],
            exclude: babelExclude,
          },
          {
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            loader: 'file-loader',
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ]
      }
    ]
  },
  resolve: {
    alias,
    extensions: ['.js', '.jsx'],
  },
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
    rc: 'empty',
    __dirname: false,
    __filename: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  target: 'node',
};

// PROD ONLY
if (process.env.NODE_ENV === 'production') {
  // config.plugins.push(
  //   new webpack.optimize.UglifyJsPlugin(),
  // );
}
// NON-PROD ONLY
else {
  config.plugins.push(
    //   { enforce: 'pre', test: /\.jsx?$/, loader: 'eslint-loader', exclude: babelExclude },
  );
}
module.exports = config
