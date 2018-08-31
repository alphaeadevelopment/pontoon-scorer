import React from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import Ionicon from 'react-ionicons';
import { openDrawer } from '../actions/drawer';

const styles = theme => ({
  root: {
    'display': 'flex',
    'background': theme.palette.primary.dark,
    '&>div': {
      'display': 'flex',
      'justifyContent': 'flex-start',
      'width': '100%',
      'margin': theme.spacing.unit,
      'padding': `${theme.spacing.unit * 2}px`,
      '&>h1 a': {
        'color': theme.palette.primary.contrastText,
      },
    },
  },
  title: {
    'line-height': '40px',
  },
  menuIcon: {
    'fill': 'white',
    'width': '40px',
    'height': '40px',
    'cursor': 'pointer',
    'margin-right': '40px',
  },
});
@connect(() => ({}), {
  openDrawer,
})
@injectSheet(styles)
class RawHeader extends React.Component {
  showMenuDrawer = () => {
    const { openDrawer } = this.props;
    openDrawer();
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div>
          <Ionicon className={classes.menuIcon} icon={'md-menu'} onClick={this.showMenuDrawer} />
          <Typography className={classes.title} variant={'display2'}>
            <a href={'/'}>
              Pontoon Scorer
            </a>
          </Typography>
        </div>
      </div>
    );
  }
}
export default RawHeader;
