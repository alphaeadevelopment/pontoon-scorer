import findIndex from 'lodash/findIndex';

export default ({ players, dealer }) => findIndex(players, p => p.idx !== dealer);
