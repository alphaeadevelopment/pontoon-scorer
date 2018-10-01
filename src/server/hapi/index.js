
import Hapi from 'hapi';
import inert from 'inert';
import path from 'path';
import routes from './routes';
import configureWebpack from './configure-webpack';

const port = process.env.PORT || 3000;

const distDir = path.join(__dirname, '../../../dist');
let hapiConfig = {
  port,
  address: '0.0.0.0',
  routes: {
    files: {
      relativeTo: distDir,
    },
  },
};
if (process.env.NODE_ENV !== 'production') {
  hapiConfig = {
    ...hapiConfig,
    host: 'localhost',
  };
}
const server = Hapi.server(hapiConfig);

const init = () => {
  Promise.all([
    configureWebpack(server),
    server.register(inert),
  ])
    .then(() => {
      routes.forEach(r => server.route(r));

      return server.start()
        .then(() => {
          console.log(`Server running at: ${server.info.uri}`); // eslint-disable-line no-console
        });
    });
};

process.on('unhandledRejection', (err) => {
  console.log(err); // eslint-disable-line no-console
  process.exit(1);
});

init();
