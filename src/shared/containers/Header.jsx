import React, { Fragment } from 'react';
import classNames from 'classnames';
import injectSheet from 'react-jss';
import Ionicon from 'react-ionicons';
import withSizeClasses from './withSizeClasses';
import Leaderboard from './Leaderboard';
import { Typography } from '../components';

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
  },
  'menuIcon': {
    'extend': 'icon',
    'margin-right': `${theme.spacing.unit}px`,
  },
  'settingsIcon': {
    'extend': 'icon',
  },
  'md': {},
});
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
    const { classes, className, openSettings } = this.props;
    return (
      <Fragment>
        <header className={classNames(classes.root, className)}>
          <div className={classes.left}>
            <Ionicon className={classes.menuIcon} icon={'md-menu'} onClick={this.showMenuDrawer} />
            <Typography className={classes.title} variant={'display2'}>
              <a href={'/'}>
                Pontoon Scorer
              </a>
            </Typography>
          </div>
          <Ionicon className={classes.settingsIcon} icon={'md-settings'} onClick={openSettings} />
        </header>
        <Leaderboard open={drawerOpen} onClose={this.hideMenuDrawer} />
      </Fragment>
    );
  }
}
export default Header;
