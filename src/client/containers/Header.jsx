import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    'display': 'flex',
    'background': theme.palette.primary.dark,
    '&>div': {
      'display': 'flex',
      'justifyContent': 'space-between',
      'width': '100%',
      'margin': theme.spacing.unit,
      'padding': `${theme.spacing.unit * 2}px`,
      '&>h1 a': {
        'color': theme.palette.primary.contrastText,
      },
    },
  },
});
class RawHeader extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div>
          <Typography variant={'display2'}>
            <a href={'/'}>Pontoon Scorer</a>
          </Typography>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(RawHeader);
