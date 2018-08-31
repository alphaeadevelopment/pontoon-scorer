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
      'flex-direction': 'row-reverse',
      'justifyContent': 'space-between',
      'width': '100%',
      'margin': theme.spacing.unit,
      'padding': `${theme.spacing.unit * 2}px`,
      '&>h1 a': {
        'color': theme.palette.primary.contrastText,
      },
    },
  },
  menuIcon: {
    fill: 'white',
    width: '40px',
    height: '40px',
    cursor: 'pointer',
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
          <Typography variant={'display2'}>
            <a href={'/'}>
              Pontoon Scoxrer
            </a>
          </Typography>
          <Ionicon className={classes.menuIcon} icon={'md-menu'} onClick={this.showMenuDrawer} />
        </div>
      </div>
    );
  }
}
export default RawHeader;
