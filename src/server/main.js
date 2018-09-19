import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import publicPath from './public-path';
import rootRouter from './routes';
import configureWebpack from './configure-webpack';

const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());

app.use(rootRouter);
// serve static files from webpack dist dir
console.log(publicPath);
app.use(express.static(publicPath));
configureWebpack(app);

const server = http.createServer(app);

server.listen(port, () => {
  console.log('Listening on %s', port); // eslint-disable-line no-console
});
