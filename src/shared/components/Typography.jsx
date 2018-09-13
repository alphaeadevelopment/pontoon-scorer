import React from 'react';
import classNames from 'classnames';
import injectSheet from 'react-jss';
import memoize from 'lodash.memoize';
import omit from 'lodash.omit';

const variantClass = (classes, variant) => {
  if (!classes[variant]) return {};
  const className = classes[variant];
  return { [className]: true };
};
const elementByVariant = (el) => {
  switch (el) {
    case 'display1':
    case 'display2':
    case 'display3':
    case 'display4':
    case 'headline':
      return 'h1';
    case 'title':
      return 'h2';
    case 'subheading':
      return 'h3';
    case 'body2':
      return 'aside';
    case 'body1':
    default:
      return 'p';
  }
};
const styles = theme => ({
  root: {
    fontWeight: 400,
    margin: 0,
    color: theme.palette.grey[600],
  },
  display: {
    '&$size1': {
      fontSize: '1.2rem',
    },
    '&$size2': {
      fontSize: '1.5rem',
    },
  },
  headline: {},
  title: {},
  subheading: {},
  caption: {},
  button: {},
  body: {
    'color': theme.palette.black,
    '&$size1': {

      fontSize: '0.875rem',
    },
  },
  size1: {},
  size2: {},
  size3: {},
  size4: {},
  paragraph: {},
  noWrap: {},
});

const getElement = memoize(el => props => React.createElement(el, props));

const Typography = ({ classes, children, className, noWrap, paragraph, variant = 'body1', ...rest }) => {
  const element = elementByVariant(variant);
  const otherClasses = {
    ...variantClass,
    [classes.paragraph]: !!paragraph,
    [classes.noWrap]: !!noWrap,
    [classes.body]: variant.includes('body'),
    [classes.display]: variant.includes('display'),
    [classes.size1]: variant.endsWith('1'),
    [classes.size2]: variant.endsWith('2'),
    [classes.size3]: variant.endsWith('3'),
    [classes.size4]: variant.endsWith('4'),
  };
  const Element = getElement(element);
  return (
    <Element className={classNames(classes.root, className, otherClasses)} {...omit(rest, ['theme'])}>
      {children}
    </Element>
  );
};
export default injectSheet(styles)(Typography);

