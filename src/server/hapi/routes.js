import ssr from './handlers/ssr';

export default [
  {
    method: 'GET',
    path: '/{param*}',
    handler: ssr,
  },
  // {
  //   method: 'GET',
  //   path: '/static/{param*}',
  //   handler: {
  //     directory: {
  //       path: '.',
  //       redirectToSlash: true,
  //       index: true,
  //     },
  //   },
  // },
];
