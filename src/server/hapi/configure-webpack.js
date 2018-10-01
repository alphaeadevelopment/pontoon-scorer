import WebpackPlugin from 'hapi-webpack-plugin';

export default (server) => {
  if (process.env.NODE_ENV === 'production') return Promise.resolve();

  // eslint-disable-next-line global-require
  const { compiler, devMiddlewareOptions, hotMiddlewareOptions } = require('../webpack');
  // eslint-disable-next-line global-require,import/no-extraneous-dependencies
  const DashboardPlugin = require('webpack-dashboard/plugin');

  compiler.apply(new DashboardPlugin({ host: 'localhost', port: process.env.DASHBOARD_PORT || 3005 }));

  return server.register({
    plugin: WebpackPlugin,
    options: { compiler, assets: devMiddlewareOptions, hot: hotMiddlewareOptions },
  });
};
