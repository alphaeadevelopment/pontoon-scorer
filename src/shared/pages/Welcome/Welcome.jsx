import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import injectSheet from 'react-jss';
import withSizeClasses from '../../containers/withSizeClasses';

const styles = theme => ({
  root: {
    '&$xs': {
      'margin': `${theme.spacing.unit * 4}px 0`,
      '& p': {
        margin: `${theme.spacing.unit * 2}px ${theme.spacing.unit}px`,
      },
    },
    '&$md': {
      'margin': `${theme.spacing.unit * 6}px 0`,
      '& p': {
        margin: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 2}px`,
      },
    },
  },
  xs: {},
  md: {},
});
const Welcome = ({ className, classes }) => (
  <div className={classNames(classes.root, className)}>
    <p>
      This app is a utility to help you keep score in a game of Pontoon,
      without having to bother with real coins or tokens.
    </p>
    <p>
      <span>
        A working knowledge of the rules of Pontoon is required. I recommend
        {' '}
      </span>
      <a href='https://www.pagat.com/banking/pontoon.html' target='blank'>
        this
      </a>
      <span>
        {' '}
        site.
      </span>
    </p>
    <p>
      <span>
        I have not included support for all variants of the game. If you have any requests
          or any feedback in general, please feel free to
        {' '}
      </span>
      <a href='mailto:animandosolutions+pontoon@gmail.com'>
        contact me
      </a>
      <span>
        {'.'}
      </span>
    </p>
    <p>
      <Link to={'/game'}>
        Start Game
      </Link>
    </p>
  </div>
);
export default injectSheet(styles)(withSizeClasses(Welcome));
