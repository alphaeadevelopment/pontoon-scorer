import React from 'react';
import injectSheet from 'react-jss';
import { Typography } from '../components';

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
class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.footerRef = React.createRef();
  }
  componentDidMount() {
    this.props.onSetHeight(this.footerRef.current.clientHeight);
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root} ref={this.footerRef}>
        <div>
          <Typography variant={'body1'}>
            <a target={'_new'} href={'https://github.com/alphaeadevelopment/pontoon-scorer'}>
              Source
            </a>
          </Typography>
          <Typography variant={'body1'}>
            <span>
              Powered by
              {' '}
            </span>
            <a target={'_new'} href={'http://animando-solutions.co.uk'}>
              Animando Solutions
            </a>
          </Typography>
        </div>
      </div>
    );
  }
}
export default injectSheet(styles)(Footer);
