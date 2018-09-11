import { Welcome, Home } from '../pages';

export default [
  {
    path: '/',
    component: Welcome,
    exact: true,
  },
  {
    path: '/game',
    component: Home,
    exact: true,
  },
];
