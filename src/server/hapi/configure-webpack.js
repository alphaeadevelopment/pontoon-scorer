import WebpackPlugin from 'hapi-webpack-plugin';

export default (server) => {
  if (process.env.NODE_ENV === 'production') return Promise.resolve();

  const { compiler, devMiddlewareOptions, hotMiddlewareOptions } = require('../webpack'); // eslint-disable-line global-require
  return server.register({
    plugin: WebpackPlugin,
    options: { compiler, assets: devMiddlewareOptions, hot: hotMiddlewareOptions },
  });
};
