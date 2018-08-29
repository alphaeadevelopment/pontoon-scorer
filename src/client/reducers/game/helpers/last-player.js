import findLastIndex from 'lodash/findLastIndex';

export default ({ players, dealer }) => findLastIndex(players, p => p.idx !== dealer);
