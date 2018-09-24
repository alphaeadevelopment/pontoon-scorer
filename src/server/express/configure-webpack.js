export default (app) => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line global-require
    const { compiler, devMiddlewareOptions } = require('../webpack');

    // eslint-disable-next-line import/no-extraneous-dependencies,global-require
    const DashboardPlugin = require('webpack-dashboard/plugin');

    compiler.apply(new DashboardPlugin());

    // eslint-disable-next-line import/no-extraneous-dependencies,global-require
    app.use(require('webpack-dev-middleware')(compiler, devMiddlewareOptions));

    // eslint-disable-next-line import/no-extraneous-dependencies,global-require
    app.use(require('webpack-hot-middleware')(compiler));
  }
};
