import { Welcome, Game } from '../pages';

export default [
  {
    path: '/',
    component: Welcome,
    exact: true,
  },
  {
    path: '/game',
    component: Game,
    exact: true,
  },
];
