import React from 'react';
import sortBy from 'lodash/sortBy';

const sortPlayersByPot = players => sortBy(players, p => 0 - p.pot);

export default ({ players }) => (
  <div>
    <p>Leaderboard</p>
    <ul>
      {sortPlayersByPot(players).map(p => (
        <li key={p.idx}>{p.name}: {p.pot}</li>
      ))}
    </ul>
  </div>
);
