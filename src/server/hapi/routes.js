import ssr from './handlers/ssr';

export default [
  {
    method: 'GET',
    path: '/{param*}',
    handler: ssr,
  },
];
