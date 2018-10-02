import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import injectSheet from 'react-jss';
import Ionicon from 'react-ionicons';
import withSizeClasses from './withSizeClasses';
import Leaderboard from './Leaderboard';
import { Typography } from '../components';
import { undo, redo } from '../pages/Game/game-actions';
import { canUndo, canRedo } from '../pages/Game/game-selectors';

const styles = theme => ({
  'root': {
    'display': 'flex',
    'background': theme.palette.primary.dark,
    'justifyContent': 'space-between',
    'alignItems': 'center',
    '& $left': {
      'display': 'flex',
      'justifyContent': 'flex-start',
      'width': '100%',
      '&>h1 a': {
        'color': theme.palette.primary.contrastText,
      },
      'padding': `${theme.spacing.unit}px`,
    },
    '&$md': {
      'padding': `${theme.spacing.unit * 2}px`,
    },
    '&$md $menuIcon': {
      'margin-right': `${theme.spacing.unit * 4}px`,
    },
  },
  'left': {
    display: 'flex',
  },
  'title': {
    'line-height': '40px',
  },
  'icon': {
    'fill': 'white',
    'width': '40px',
    'height': '40px',
    'cursor': 'pointer',
    'margin': `0 ${theme.spacing.unit}px`,
    '&:not($active)': {
      'fill': 'grey',
      'cursor': 'initial',
    },
  },
  'menuIcon': {
    'extend': 'icon',
    'margin-right': `${theme.spacing.unit}px`,
    'margin-left': 0,
  },
  'settingsIcon': {
    'extend': 'icon',
  },
  'undoIcon': {
    'extend': 'icon',
    '&:not($active)': {
      'fill': 'grey',
      'cursor': 'initial',
    },
  },
  'redoIcon': {
    'extend': 'icon',
  },
  'md': {},
  'active': {},
});
@connect(state => ({
  canUndo: canUndo(state),
  canRedo: canRedo(state),
}),
  {
    undo,
    redo,
  },
)
@injectSheet(styles)
@withSizeClasses
class Header extends React.Component {
  state = {
    drawerOpen: false,
  }
  showMenuDrawer = () => {
    this.setState({ drawerOpen: true });
  }
  hideMenuDrawer = () => {
    this.setState({ drawerOpen: false });
  }
  render() {
    const { drawerOpen } = this.state;
    const { classes, className, openSettings, canUndo, undo, canRedo, redo } = this.props;
    return (
      <Fragment>
        <header className={classNames(classes.root, className)}>
          <div className={classes.left}>
            <Ionicon className={classNames(classes.menuIcon, classes.active)} icon={'md-menu'} onClick={this.showMenuDrawer} />
            <Typography className={classes.title} variant={'display2'}>
              <a href={'/'}>
                Pontoon Scorer
              </a>
            </Typography>
          </div>
          <Ionicon
            className={classNames(classes.undoIcon, { [classes.active]: canUndo })}
            disabled={!canUndo}
            icon={'md-undo'}
            onClick={canUndo ? undo : null}
          />
          <Ionicon
            className={classNames(classes.redoIcon, { [classes.active]: canRedo })}
            disabled={!canRedo}
            icon={'md-redo'}
            onClick={canRedo ? redo : null}
          />
          <Ionicon className={classNames(classes.settingsIcon, classes.active)} icon={'md-settings'} onClick={openSettings} />
        </header>
        <Leaderboard open={drawerOpen} onClose={this.hideMenuDrawer} />
      </Fragment>
    );
  }
}
export default Header;
