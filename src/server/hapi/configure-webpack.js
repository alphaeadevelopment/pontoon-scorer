import WebpackPlugin from 'hapi-webpack-plugin';

export default (server) => {
  if (process.env.NODE_ENV === 'production') return Promise.resolve();

  // eslint-disable-next-line global-require
  const { compiler, devMiddlewareOptions, hotMiddlewareOptions } = require('../webpack');
  return server.register({
    plugin: WebpackPlugin,
    options: { compiler, assets: devMiddlewareOptions, hot: hotMiddlewareOptions },
  });
};
