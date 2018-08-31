import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import injectSheet from 'react-jss';
import { isMinSm, isMinMd, isMinLg, isMinXl } from '../../selectors/viewportSelectors';

const getXs = props => props.xs || 12;
const getSm = props => props.sm || getXs(props);
const getMd = props => props.md || getSm(props);
const getLg = props => props.lg || getMd(props);
const getXl = props => props.xl || getLg(props);

const widthProps = (widthFunc, props) => {
  const widthPercent = (100 / 12) * widthFunc(props);
  const value = `${widthPercent}%`;
  return ({
    'width': value,
    'flex-basis': value,
  });
};
const styles = {
  item: {
    padding: '16px',
  },
  xs: props => widthProps(getXs, props),
  sm: props => widthProps(getSm, props),
  md: props => widthProps(getMd, props),
  lg: props => widthProps(getLg, props),
  xl: props => widthProps(getXl, props),
};

const getGridClasses = ({ classes, className, minSm, minMd, minLg, minXl }) =>
  classNames(classes.item, className, {
    [classes.xs]: (!minSm),
    [classes.sm]: (minSm && !minMd),
    [classes.md]: (minMd && !minLg),
    [classes.lg]: (minLg && !minXl),
    [classes.xl]: !!minXl,
  });

const RawGridItem = (props) => {
  const gridClasses = getGridClasses(props);
  return (
    <div className={gridClasses} ref={props.forwardedRef}>
      {props.children}
    </div>
  );
};

const mapStateToProps = state => ({
  minSm: isMinSm(state),
  minMd: isMinMd(state),
  minLg: isMinLg(state),
  minXl: isMinXl(state),
});
export default connect(mapStateToProps)(injectSheet(styles)(RawGridItem));
