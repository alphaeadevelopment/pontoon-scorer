import React, { Component } from 'react';
import sortBy from 'lodash.sortby';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import { Typography } from '../components';
import {
  getPlayers,
  getDealerIdx,
} from '../selectors';
import {
} from '../actions';
import Drawer from './Drawer';

const styles = theme => ({
  root: {
    '& ul li': {
      listStyle: 'none',
    },
    'padding': theme.spacing.unit * 3,
  },
});

const sortPlayersByPot = players => sortBy(players, p => 0 - p.pot);

@connect(state => ({
  dealerIdx: getDealerIdx(state),
  players: getPlayers(state),
}))
@injectSheet(styles)
class Leaderboard extends Component {
  render() {
    const { classes, players, dealerIdx, open, onClose } = this.props;
    return (
      <Drawer className={classes.root} open={open} onClose={onClose}>
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
      </Drawer>
    );
  }
}

export default Leaderboard;
