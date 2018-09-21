export default (app) => {
  if (process.env.NODE_ENV !== 'production') {
    const { compiler, devMiddlewareOptions } = require('../webpack/webpack-compiler'); // eslint-disable-line global-require
    app.use(require('webpack-dev-middleware')(compiler, devMiddlewareOptions)); // eslint-disable-line import/no-extraneous-dependencies,global-require,max-len
    app.use(require('webpack-hot-middleware')(compiler)); // eslint-disable-line import/no-extraneous-dependencies,global-require,max-len
  }
};
