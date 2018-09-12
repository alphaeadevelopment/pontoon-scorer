import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import Footer from './Footer';
import Header from './Header';
import Body from './Body';
import { isDrawerOpen } from '../selectors/drawerSelectors';
import { closeDrawer, gameLoaded } from '../actions';
import { drawerRef } from '../lib/drawer';
import { modalRef } from '../lib/modal';
import { openSettings } from '../pages/Settings/actions';
import { loadGameFromBrowser } from '../lib/browser';
import Settings from '../pages/Settings';

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
  gameLoaded,
  openSettings,
})
@injectSheet(styles)
class App extends React.Component {
  state = {
    footerHeight: 0,
  }
  componentDidMount() {
    const { gameLoaded } = this.props;
    loadGameFromBrowser()
      .then((g) => {
        if (g) gameLoaded(g);
      })
      .catch((e) => {
        console.log('Error loading game from browser: %s', e);
      });
  }
  setFooterHeight = (h) => {
    this.setState({ footerHeight: h });
  }
  render() {
    const { classes, location, openSettings } = this.props;
    return (
      <div className={classes.root}>
        <div id='drawer-root' ref={drawerRef} />
        <div id='modal-root' ref={modalRef} />
        <div className={classes.headerContainer}>
          <Header openSettings={openSettings} />
        </div>
        <div className={classes.bodyContainer} style={{ marginBottom: this.state.footerHeight }}>
          <Body location={location} />
        </div>
        <div className={classes.footerContainer}>
          <Footer onSetHeight={this.setFooterHeight} />
        </div>
        <Settings />
      </div>
    );
  }
}

export default App;
