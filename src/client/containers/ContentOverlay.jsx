import React from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import { getHeight } from '../selectors/viewportSelectors';

import { isShowModal } from '../selectors/modalSelectors';
import { isDrawerOpen } from '../selectors/drawerSelectors';
import { closeDrawer } from '../actions/drawer';

const styles = {
  root: props => ({
    'height': props.height,
    'display': props.visible ? 'initial' : 'none',
    'position': 'fixed',
    'width': '100%',
    'background': 'black',
    'opacity': 0.5,
    'top': 0,
    'left': 0,
    'z-index': 5,
  }),
};
@connect(state => ({
  height: getHeight(state),
  visible: isShowModal(state) || isDrawerOpen(state),
}), {
  closeDrawer,
})
@injectSheet(styles)
class ContentOverlay extends React.Component {
  onClick = (e) => {
    e.preventDefault();
    this.props.closeDrawer();
  }
  render() {
    const { classes } = this.props;
    return (
      <div
        className={classes.root}
        onKeyPress={this.onClick}
        onClick={this.onClick}
        role={'button'}
        tabIndex={0}
      />
    );
  }
}

export default ContentOverlay;
