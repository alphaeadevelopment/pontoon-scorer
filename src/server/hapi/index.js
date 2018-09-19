
import { Server } from 'hapi';
import inert from 'inert';
import routes from './routes';
import configureWebpack from './configure-webpack';

const port = process.env.PORT || 3000;

const server = new Server({
  port,
  host: 'localhost',
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
