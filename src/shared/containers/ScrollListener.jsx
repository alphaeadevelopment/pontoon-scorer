import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { window } from '../services';
import { getRequestedScrollX, getRequestedScrollY } from '../selectors/viewportSelectors';
import { isBrowser } from '../lib/browser';

@connect(
  state => ({
    x: getRequestedScrollX(state),
    y: getRequestedScrollY(state),
  }),
)
class ScrollListener extends Component {
  componentDidUpdate(prevProps) {
    const { x, y } = this.props;
    if (isBrowser() && (prevProps.x !== x || prevProps.y !== y)) {
      window.scrollTo(x || 0, y || 0);
    }
  }
  render() {
    const { children } = this.props;
    return (
      <Fragment>
        {children}
      </Fragment>
    );
  }
}

export default ScrollListener;
