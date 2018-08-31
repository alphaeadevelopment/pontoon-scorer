import React from 'react';
import classNames from 'classnames';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import { isDrawerOpen } from '../selectors/drawerSelectors';
import { getHeight } from '../selectors/viewportSelectors';
import { closeDrawer } from '../actions/drawer';
import Leaderboard from '../pages/Leaderboard';

const styles = {
  root: {
    '&$drawerOpen': {
      transform: 'translateX(0%)',
    },
    'background': 'white',
    'height': props => props.height,
    'left': 0,
    'position': 'fixed',
    'top': 0,
    'transform': 'translateX(-100%)',
    'transition': 'transform 0.5s ease-in-out',
    'width': '300px',
    'z-index': 6,
  },
  drawerOpen: {},
};
@connect(state => ({
  drawerOpen: isDrawerOpen(state),
  height: getHeight(state),
}), {
  closeDrawer,
})
@injectSheet(styles)
class DrawerContainer extends React.Component {
  render() {
    const { classes, drawerOpen } = this.props;
    return (
      <div
        className={classNames(classes.root, { [classes.drawerOpen]: drawerOpen })}
      >
        <Leaderboard />
      </div>
    );
  }
}

export default DrawerContainer;
