import React from 'react';
import { withStyles } from 'material-ui/styles';
import { Home } from '../pages';

const styles = {
  root: {},
};
class RawBody extends React.Component {
  render() {
    const { footerHeight, classes, ...rest } = this.props;
    const ctrStyles = {
      height: `calc(100vh - ${footerHeight}px)`,
    };
    return (
      <div className={classes.root} style={ctrStyles}>
        <Home {...rest} />
      </div>
    );
  }
}

export default withStyles(styles)(RawBody);
