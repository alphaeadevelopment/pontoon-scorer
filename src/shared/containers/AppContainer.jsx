import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router';
import { JssProvider, ThemeProvider } from 'react-jss';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider as ReduxProvider } from 'react-redux';

import { jss } from '../styles';
import WindowEventProvider from './WindowEventProvider';
import ScrollListener from './ScrollListener';
import theme from '../styles/theme';
import App from './App';

@withRouter
class AppContainer extends Component {
  render() {
    const { jssRegistry, location, store } = this.props;
    return (
      <ReduxProvider store={store}>
        <JssProvider jss={jss} registry={jssRegistry}>
          <ThemeProvider theme={theme}>
            <WindowEventProvider>
              <ScrollListener>
                <Fragment>
                  <CssBaseline />
                  <App location={location} />
                </Fragment>
              </ScrollListener>
            </WindowEventProvider>
          </ThemeProvider>
        </JssProvider>
      </ReduxProvider>
    );
  }
}

export default AppContainer;
