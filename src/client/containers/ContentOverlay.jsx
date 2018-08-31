import React from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import { getHeight } from '../selectors/viewportSelectors';
import { isShowModal } from '../selectors/modalSelectors';

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
class RawContentOverlay extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root} />
    );
  }
}

const mapStateToProps = state => ({
  height: getHeight(state),
  visible: isShowModal(state),
});
export default connect(mapStateToProps)(injectSheet(styles)(RawContentOverlay));
