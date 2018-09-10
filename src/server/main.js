import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import publicPath from './public-path';
import onServerStarted from './on-server-started';
import rootRouter from './routers';
import configureWebpack from './configure-webpack';

const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());

app.use(rootRouter);
// serve static files from webpack dist dir
app.use(express.static(publicPath));
configureWebpack(app);

const server = http.createServer(app);

server.listen(port, onServerStarted(port));
