/* globals window, document */
import React, { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { JssProvider, ThemeProvider } from 'react-jss';

import { Provider as ReduxProvider } from 'react-redux';
import { App, WindowEventProvider } from './containers';
import './styles/main.scss';
import { createStore } from './lib/redux';
import { createJss, theme } from './styles';

const jss = createJss();

const getWindowState = () => {
  // Grab the state from a global variable injected into the server-generated HTML
  const preloadedState = window.__PRELOADED_STATE__; // eslint-disable-line no-underscore-dangle
  // Allow the passed state to be garbage-collected
  delete window.__PRELOADED_STATE__; // eslint-disable-line no-underscore-dangle
  return preloadedState;
};

// eslint-disable-next-line no-underscore-dangle
const store = createStore(getWindowState(), window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__);

export default class Root extends React.Component {
  // Remove the server-side injected CSS.
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }
  render() {
    return (
      <ReduxProvider store={store}>
        <WindowEventProvider>
          <JssProvider jss={jss}>
            <ThemeProvider theme={theme}>
              <Fragment>
                <CssBaseline />
                <App />
              </Fragment>
            </ThemeProvider>
          </JssProvider>
        </WindowEventProvider>
      </ReduxProvider>
    );
  }
}
