import React from 'react';
import sortBy from 'lodash/sortBy';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    '& ul li': {
      listStyle: 'none',
    },
    'margin': theme.spacing.unit * 3,
  },
});

const sortPlayersByPot = players => sortBy(players, p => 0 - p.pot);

export const RawLeaderboard = ({ classes, players, dealer }) => (
  <div className={classes.root}>
    <Typography variant={'display1'}>Leaderboard</Typography>
    <ul>
      {sortPlayersByPot(players).map(p => (
        <li key={p.idx}>{p.name}: {p.pot} {p.idx === dealer && <span>(Dealer)</span>}</li>
      ))}
    </ul>
  </div>
);
export default withStyles(styles)(RawLeaderboard);
