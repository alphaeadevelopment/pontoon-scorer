import WebpackPlugin from 'hapi-webpack-plugin';
import assets from '../webpack/webpack-dev-middleware-options';
import hot from '../webpack/webpack-hot-middleware-options';

export default (server) => {
  if (process.env.NODE_ENV === 'production') return Promise.resolve();
  const compiler = require('../webpack/webpack-compiler').default; // eslint-disable-line global-require

  return server.register({
    plugin: WebpackPlugin,
    options: { compiler, assets, hot },
  });
};
