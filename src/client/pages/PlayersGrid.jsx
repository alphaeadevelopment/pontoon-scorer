import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import clone from 'lodash/clone';
import injectSheet from 'react-jss';
import Player from './Player';
import {
  getDealerIdx,
  getPlayers,
} from '../selectors';
import {
  Grid,
} from '../components';
import withSizeClasses from '../containers/withSizeClasses';

const styles = theme => ({
  root: {
    'width': '100%',
    'padding': 0,
    '&$md': {
      padding: theme.spacing.unit,
    },
  },
  md: {},
});

const sortPlayers = (players, dealerIdx) => clone(players)
  .sort((a, b) => {
    if (a.idx === dealerIdx) return -1;
    if (b.idx === dealerIdx) return 1;
    return a.idx - b.idx;
  });

@connect(state => ({
  dealerIdx: getDealerIdx(state),
  players: getPlayers(state),
}))
@injectSheet(styles)
@withSizeClasses
class PlayersGrid extends React.Component {
  render() {
    const { classes, className, players, dealerIdx } = this.props;
    return (
      <Grid container className={classNames(classes.root, className)}>
        {sortPlayers(players, dealerIdx).map(p => (
          <Player
            key={p.idx}
            player={p}
          />
        ))}
      </Grid>
    );
  }
}
export default PlayersGrid;
