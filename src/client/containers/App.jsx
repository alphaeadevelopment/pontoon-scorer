import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import Footer from './Footer';
import Header from './Header';
import Body from './Body';
import { isDrawerOpen } from '../selectors/drawerSelectors';
import { closeDrawer } from '../actions';
import { drawerRef } from '../lib/drawer';

const styles = {
  root: {
    position: 'relative',
  },
  headerContainer: {

  },
  footerContainer: {
    position: 'fixed',
    width: '100%',
    top: '100%',
    transform: 'translateY(-100%) translateZ(0)',
  },
  bodyContainer: {

  },
};
@connect(state => (
  {
    drawerOpen: isDrawerOpen(state),
  }
), {
  closeDrawer,
})
@injectSheet(styles)
class App extends React.Component {
  state = {
    footerHeight: 0,
  }
  setFooterHeight = (h) => {
    this.setState({ footerHeight: h });
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div id='drawer-root' ref={drawerRef} />
        <div className={classes.headerContainer}>
          <Header />
        </div>
        <div className={classes.bodyContainer} style={{ marginBottom: this.state.footerHeight }}>
          <Body />
        </div>
        <div className={classes.footerContainer}>
          <Footer onSetHeight={this.setFooterHeight} />
        </div>
      </div>
    );
  }
}

export default App;
