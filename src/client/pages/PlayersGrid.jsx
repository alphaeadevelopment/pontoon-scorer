import React from 'react';
import { connect } from 'react-redux';
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

const styles = theme => ({
  root: {
    width: '100%',
    padding: theme.spacing.unit,
  },
});

const sortPlayers = (players, dealerIdx) => clone(players)
  .sort((a, b) => {
    if (a.idx === dealerIdx) return -1;
    if (b.idx === dealerIdx) return 1;
    return a.idx - b.idx;
  });

class RawPlayersGrid extends React.Component {
  render() {
    const {
      classes, players, dealerIdx } = this.props;
    return (
      <Grid container className={classes.root}>
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
const mapStateToProps = state => ({
  dealerIdx: getDealerIdx(state),
  players: getPlayers(state),
});

export default connect(mapStateToProps)(injectSheet(styles)(RawPlayersGrid));
