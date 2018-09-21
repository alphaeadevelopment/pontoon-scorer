
import { Server } from 'hapi';
import inert from 'inert';
import path from 'path';
import routes from './routes';
import configureWebpack from './configure-webpack';

const port = process.env.PORT || 3000;

const distDir = path.join(__dirname, '../../../dist');
const server = new Server({
  port,
  host: 'localhost',
  routes: {
    files: {
      relativeTo: distDir,
    },
  },
});

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
