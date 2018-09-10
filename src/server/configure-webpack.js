/* eslint-disable global-require */

export default (app) => {
  if (process.env.NODE_ENV !== 'production') {
    const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies
    const webpackConfig = require('../../config/webpack.client');
    const webpackCompiler = webpack(webpackConfig);
    const webpackDevOptions = {
      noInfo: true, publicPath: webpackConfig.output.publicPath,
    };
    app.use(require('webpack-dev-middleware')(webpackCompiler, webpackDevOptions)); // eslint-disable-line import/no-extraneous-dependencies,max-len
    app.use(require('webpack-hot-middleware')(webpackCompiler)); // eslint-disable-line import/no-extraneous-dependencies,max-len
  }
};
