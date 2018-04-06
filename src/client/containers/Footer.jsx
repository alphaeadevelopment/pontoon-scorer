import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: {
    'display': 'flex',
    'background': theme.palette.primary.dark,
    'fontSize': '80%',
    '&>div': {
      'top': '100%',
      'display': 'flex',
      'justifyContent': 'space-between',
      'width': '100%',
      'margin': theme.spacing.unit,
      '&>p': {
        'color': theme.palette.primary.contrastText,
      },
    },
  },
});
class RawFooter extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div>
          <Typography variant={'body1'}>
            <a target={'_new'} href={'https://github.com/alphaeadevelopment/pontoon-scorer'}>Pontoon Scorer</a>
          </Typography>
          <Typography variant={'body1'}>
            <span>Powered by </span>
            <a target={'_new'} href={'http://animando-solutions.co.uk'}>Animando Solutions</a>
          </Typography>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(RawFooter);
