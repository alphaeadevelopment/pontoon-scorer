import React from 'react';
import sortBy from 'lodash/sortBy';
import Typography from 'material-ui/Typography';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import {
  getPlayers,
  getDealerIdx,
} from '../selectors';
import {
} from '../actions';

const styles = theme => ({
  root: {
    '& ul li': {
      listStyle: 'none',
    },
    'margin': theme.spacing.unit * 3,
  },
});

const sortPlayersByPot = players => sortBy(players, p => 0 - p.pot);

export const RawLeaderboard = ({ classes, players, dealerIdx }) => (
  <div className={classes.root}>
    <Typography variant={'display1'}>
      Leaderboard
    </Typography>
    <ul>
      {sortPlayersByPot(players).map(p => (
        <li key={p.idx}>
          {p.name}
          :
          {' '}
          {p.pot}
          {' '}
          {p.idx === dealerIdx &&
            <span>
              (Dealer)
            </span>
          }
        </li>
      ))}
    </ul>
  </div>
);

const mapStateToProps = state => ({
  dealerIdx: getDealerIdx(state),
  players: getPlayers(state),
});

export default connect(mapStateToProps)(injectSheet(styles)(RawLeaderboard));
