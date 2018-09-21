import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import publicPath from '../public-path';
import router from './routes';
import configureWebpack from './configure-webpack';

const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());

app.use(router);
// serve static files from webpack dist dir
app.use('static', express.static(publicPath));
configureWebpack(app);

const server = http.createServer(app);

server.listen(port, () => {
  console.log('Listening on %s', port); // eslint-disable-line no-console
});
