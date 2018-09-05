import React from 'react';
import { CSSTransition } from 'react-transition-group';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import { getHeight } from '../selectors/viewportSelectors';

const styles = {
  root: {
    'display': 'none',
    'height': props => props.height,
    'position': 'fixed',
    'width': '100%',
    'background': 'black',
    'top': 0,
    'left': 0,
    'z-index': 5,
    '&$enter': {
      'opacity': 0,
      'display': 'initial',
      'transition': 'opacity 0.5s',
    },
    '&$enterActive': {
      'opacity': 0.5,
    },
    '&$enterDone': {
      'opacity': 0.5,
      'display': 'initial',
    },
    '&$exit': {
      'display': 'initial',
      'opacity': 0.5,
      'transition': 'opacity 0.5s',
    },
    '&$exitActive': {
      'opacity': 0,
    },
    '&$exitDone': {
      display: 'none',
    },
  },
  appear: {},
  appearActive: {},
  enter: {},
  enterActive: {},
  enterDone: {},
  exit: {},
  exitActive: {},
  exitDone: {},
};
@connect(state => ({
  height: getHeight(state),
}))
@injectSheet(styles)
class ContentOverlay extends React.Component {
  componentWillReceiveProps(nextProps) {
    console.log('ContentOverlay.nextProps', nextProps);
  }
  onClick = (e) => {
    e.preventDefault();
    this.props.onBackgroundClicked();
  }
  render() {
    const { classes, visible } = this.props;
    console.log('overlay visibile', visible);
    return (
      <CSSTransition
        in={visible}
        timeout={500}
        classNames={{
          appear: classes.appear,
          appearActive: classes.appearActive,
          enter: classes.enter,
          enterActive: classes.enterActive,
          enterDone: classes.enterDone,
          exit: classes.exit,
          exitActive: classes.exitActive,
          exitDone: classes.exitDone,
        }}
      >
        <div
          className={classes.root}
          onKeyPress={this.onClick}
          onClick={this.onClick}
          role={'button'}
          tabIndex={0}
        />
      </CSSTransition>
    );
  }
}
export default ContentOverlay;
