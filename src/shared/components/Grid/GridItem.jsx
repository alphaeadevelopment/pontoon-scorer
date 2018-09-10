import React from 'react';
import classNames from 'classnames';
import injectSheet from 'react-jss';
import withSizeClasses from '../../containers/withSizeClasses';

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
  xs: props => ({
    ...widthProps(getXs, props),
    padding: '8px',
  }),
  sm: props => ({
    ...widthProps(getSm, props),
    padding: '8px',
  }),
  md: props => ({
    ...widthProps(getMd, props),
    padding: '16px',
  }),
  lg: props => ({
    ...widthProps(getLg, props),
    padding: '16px',
  }),
  xl: props => ({
    ...widthProps(getXl, props),
    padding: '16px',
  }),
};

@injectSheet(styles)
@withSizeClasses
class GridItem extends React.Component {
  render() {
    const { classes, className, forwardedRef, children } = this.props;
    return (
      <div className={classNames(classes.root, className)} ref={forwardedRef}>
        {children}
      </div>
    );
  }
}

export default GridItem;
