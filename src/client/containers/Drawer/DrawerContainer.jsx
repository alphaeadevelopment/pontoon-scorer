import React from 'react';
import { connect } from 'react-redux';
import { getHeight } from '../../selectors/viewportSelectors';
import { drawerRef } from '../../lib/drawer';
import Drawer from './Drawer';

@connect(state => ({
  pageHeight: getHeight(state),
}))
class DrawerContainer extends React.Component {
  componentDidMount() {
    this.interval = setInterval(this.checkDrawerRef, 100);
  }
  componentWillUnmount() {
    if (this.interval) clearInterval(this.interval);
  }
  checkDrawerRef = () => {
    if (drawerRef.current) {
      this.forceUpdate();
      clearInterval(this.interval);
    }
  }
  render() {
    return (
      <Drawer {...this.props} />
    );
  }
}

export default DrawerContainer;
