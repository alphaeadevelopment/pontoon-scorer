import config from './webpack-client-config';

export default ({
  noInfo: true,
  publicPath: config.output.publicPath,
});
