import React from 'react';
import { withStyles } from 'material-ui/styles';
import { Home } from '../pages';

const styles = {
  root: {},
};
class RawBody extends React.Component {
  render() {
    const { footerHeight, classes, ...rest } = this.props;
    return (
      <div className={classes.root}>
        <Home {...rest} />
      </div>
    );
  }
}

export default withStyles(styles)(RawBody);
