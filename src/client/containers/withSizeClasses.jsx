import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { isMinSm, isMinMd, isMinLg, isMinXl } from '../selectors/viewportSelectors';

const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component';

const getClasses = ({ classes, className, minSm, minMd, minLg, minXl }) => {
  const isXl = !!classes.xl && !!minXl;
  const isLg = !!classes.lg && minLg && !isXl;
  const isMd = !!classes.md && minMd && !isLg && !isXl;
  const isSm = !!classes.sm && minSm && !isMd && !isLg && !isXl;
  const isXs = !!classes.xs && !isSm && !isMd && !isLg && !isXl;
  const rv = classNames(className, {
    [classes.xs]: isXs,
    [classes.sm]: isSm,
    [classes.md]: isMd,
    [classes.lg]: isLg,
    [classes.xl]: isXl,
  });
  return rv;
};

export default (Wrapped) => {
  @connect(state => (
    {
      minSm: isMinSm(state),
      minMd: isMinMd(state),
      minLg: isMinLg(state),
      minXl: isMinXl(state),
    }
  ))
  class WithSizeClasses extends Component {
    render() {
      const { className, ...rest } = this.props;
      return <Wrapped {...rest} className={getClasses(this.props)} />;
    }
  }
  WithSizeClasses.displayName = `WithSizeClasses(${getDisplayName(Wrapped)})`;
  return WithSizeClasses;
};

