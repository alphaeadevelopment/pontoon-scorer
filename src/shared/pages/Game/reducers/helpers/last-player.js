import findLastIndex from 'lodash.findlastindex';

export default ({ players, dealer }) => findLastIndex(players, p => p.idx !== dealer);
