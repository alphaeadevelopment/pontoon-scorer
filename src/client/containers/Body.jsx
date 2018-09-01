import React from 'react';
import injectSheet from 'react-jss';
import { Home } from '../pages';
import DrawerContainer from './DrawerContainer';

const styles = {
  root: { position: 'relative' },
};
class RawBody extends React.Component {
  render() {
    const { footerHeight, classes, ...rest } = this.props;
    return (
      <div className={classes.root}>
        <DrawerContainer />
        <Home {...rest} />
      </div>
    );
  }
}

export default injectSheet(styles)(RawBody);
