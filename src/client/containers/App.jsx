import React from 'react';

import injectSheet from 'react-jss';
import Footer from './Footer';
import Header from './Header';
import Body from './Body';
import ContentOverlay from './ContentOverlay';

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
    transform: 'translateY(-100%)',
  },
  bodyContainer: {

  },
};
@injectSheet(styles)
class App extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <ContentOverlay />
        <div className={classes.headerContainer}>
          <Header />
        </div>
        <div className={classes.bodyContainer}>
          <Body />
        </div>
        <div className={classes.footerContainer}>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
