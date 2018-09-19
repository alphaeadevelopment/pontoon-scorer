import webpackDevOptions from '../webpack/webpack-dev-middleware-options';

export default (app) => {
  if (process.env.NODE_ENV !== 'production') {
    const compiler = require('../webpack/webpack-compiler').default; // eslint-disable-line global-require
    app.use(require('webpack-dev-middleware')(compiler, webpackDevOptions)); // eslint-disable-line import/no-extraneous-dependencies,global-require,max-len
    app.use(require('webpack-hot-middleware')(compiler)); // eslint-disable-line import/no-extraneous-dependencies,global-require,max-len
  }
};
