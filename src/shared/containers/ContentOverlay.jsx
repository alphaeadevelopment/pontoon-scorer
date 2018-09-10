import React from 'react';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import injectSheet from 'react-jss';

const transitionDuration = 500;

const styles = {
  root: {
    '&$hidden': {
      'display': 'none',
    },
    '&:not($hidden)': {
      'opacity': 0.5,
    },
    'height': props => props.pageHeight,
    'position': 'fixed',
    'width': '100%',
    'background': 'black',
    'top': 0,
    'left': 0,
    'z-index': 5,
    '&$enter': {
      'opacity': 0,
      'display': 'initial',
      'transition': `opacity ${transitionDuration / 1000}s`,
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
      'transition': `opacity ${transitionDuration / 1000}s`,
    },
    '&$exitActive': {
      'opacity': 0,
    },
    '&$exitDone': {
      display: 'none',
    },
  },
  hidden: {},
  appear: {},
  appearActive: {},
  enter: {},
  enterActive: {},
  enterDone: {},
  exit: {},
  exitActive: {},
  exitDone: {},
};
@injectSheet(styles)
class ContentOverlay extends React.Component {
  onClick = (e) => {
    const { onBackgroundClicked } = this.props;
    e.preventDefault();
    if (onBackgroundClicked) onBackgroundClicked();
  }
  render() {
    const { classes, visible } = this.props;
    return (
      <CSSTransition
        in={visible}
        timeout={transitionDuration}
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
          className={classNames(classes.root, { [classes.hidden]: !visible })}
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
