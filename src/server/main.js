/* eslint-disable global-require */
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import http from 'http';
import publicPath from './public-path';


const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies
  const webpackConfig = require('../../config/webpack.client');
  const webpackCompiler = webpack(webpackConfig);
  const webpackDevOptions = {
    noInfo: true, publicPath: webpackConfig.output.publicPath,
  };
  app.use(require('webpack-dev-middleware')(webpackCompiler, webpackDevOptions)); // eslint-disable-line import/no-extraneous-dependencies,max-len
  app.use(require('webpack-hot-middleware')(webpackCompiler)); // eslint-disable-line import/no-extraneous-dependencies,max-len
}

const index = path.join(publicPath, 'index.html');
app.get('/', (req, res) => {
  res.sendFile(index);
});

const server = http.createServer(app);

// serve static files from webpack dist dir
app.use(express.static(publicPath));

server.listen(port, () => {
  console.log('Listening on %s', port); // eslint-disable-line no-console
});
