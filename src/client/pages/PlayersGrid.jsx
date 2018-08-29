import React from 'react';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import clone from 'lodash/clone';
import { withStyles } from 'material-ui/styles';
import Player from './Player';
import {
  getPlayers,
  getDealerIdx,
} from '../selectors';

const styles = theme => ({
  root: {
    width: '100%',
    padding: theme.spacing.unit * 2,
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
  players: getPlayers(state),
  dealerIdx: getDealerIdx(state),
});

export default connect(mapStateToProps)(withStyles(styles)(RawPlayersGrid));
