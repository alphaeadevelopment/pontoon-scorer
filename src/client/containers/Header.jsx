import React from 'react';
import classNames from 'classnames';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import Ionicon from 'react-ionicons';
import { openDrawer } from '../actions/drawer';
import withSizeClasses from './withSizeClasses';
import Drawer from './Drawer';
import Leaderboard from '../pages/Leaderboard';

const styles = theme => ({
  'root': {
    'display': 'flex',
    'background': theme.palette.primary.dark,
    '&>div': {
      'display': 'flex',
      'justifyContent': 'flex-start',
      'width': '100%',
      '&>h1 a': {
        'color': theme.palette.primary.contrastText,
      },
      'padding': `${theme.spacing.unit}px`,
    },
    '&$md>div': {
      'margin': theme.spacing.unit,
      'padding': `${theme.spacing.unit * 2}px`,
    },
    '&$md $menuIcon': {
      'margin-right': `${theme.spacing.unit * 4}px`,
    },
    '& $menuIcon': {
      'fill': 'white',
      'width': '40px',
      'height': '40px',
      'cursor': 'pointer',
      'margin-right': `${theme.spacing.unit}px`,
    },
  },
  'title': {
    'line-height': '40px',
  },
  'menuIcon': {},
  'md': {},
});
@connect(null, {
  openDrawer,
})
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
    const { classes, className } = this.props;
    return (
      <div className={classNames(classes.root, className)}>
        <div>
          <Ionicon className={classes.menuIcon} icon={'md-menu'} onClick={this.showMenuDrawer} />
          <Typography className={classes.title} variant={'display2'}>
            <a href={'/'}>
              Pontoon Scorer
            </a>
          </Typography>
        </div>
        <Drawer open={drawerOpen}>
          <Leaderboard />
        </Drawer>
      </div>
    );
  }
}
export default Header;
