import React from 'react';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';

// components
import Footer from './Footer';
import Header from './Header';
import Body from './Body';
import Settings from '../pages/Settings';
import LoadGameModal from './LoadGameModal';

// selectors
import { isDrawerOpen } from '../selectors/drawerSelectors';

// actions
import { gameLoaded } from '../pages/Game/game-actions';
import { openSettings } from '../pages/Settings/settings-actions';

// lib
import { drawerRef } from '../lib/drawer';
import { modalRef } from '../lib/modal';
import { loadGameFromBrowser } from '../lib/browser';

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
    position: 'relative',
  },
};
@connect(state => (
  {
    drawerOpen: isDrawerOpen(state),
  }
), {
  gameLoaded,
  openSettings,
})
@injectSheet(styles)
class App extends React.Component {
  state = {
    footerHeight: 0,
    loadedGame: null,
  }
  componentDidMount() {
    loadGameFromBrowser()
      .then((g) => {
        this.setState({ loadedGame: g });
      })
      .catch((e) => {
        console.log('Error loading game from browser: %s', e);
      });
  }
  onLoadGame = () => {
    this.props.gameLoaded(this.state.loadedGame);
    this.setState({ loadedGame: null });
  }
  onNewGame = () => {
    this.setState({ loadedGame: null });
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
        <Header className={classes.headerContainer} openSettings={openSettings} />
        <Body className={classes.bodyContainer} footerOffset={this.state.footerHeight} location={location} />
        <Footer className={classes.footerContainer} onSetHeight={this.setFooterHeight} />
        <Settings />
        <LoadGameModal open={!!this.state.loadedGame} onLoadGame={this.onLoadGame} onCancel={this.onNewGame} />
      </div>
    );
  }
}

export default App;
