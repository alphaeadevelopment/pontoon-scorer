/* globals window, document */
import React, { Fragment } from 'react';
import CssBaseline from 'material-ui/CssBaseline';
// import SocketProvider from '@alphaeadev/react-socketio';
import { JssProvider } from 'react-jss';
import { MuiThemeProvider } from 'material-ui/styles';
import { create as createJss } from 'jss';
import preset from 'jss-preset-default';

import { createStore, applyMiddleware, compose } from 'redux';
import { HashRouter as Router } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import thunk from 'redux-thunk';
import theme from './styles/theme';
import reducer from './reducers';
import { App, WindowEventProvider } from './containers';
import './styles/main.scss';

const jss = createJss(preset());

const middleware = [thunk];

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
if (process.env.NODE_ENV !== 'production') {
  // middleware.push(createLogger());
}
// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__; // eslint-disable-line no-underscore-dangle

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__; // eslint-disable-line no-underscore-dangle

const store = createStore(
  reducer,
  preloadedState,
  composeEnhancers(applyMiddleware(...middleware)),
);

// const generateClassName = createGenerateClassName();

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
      <Router>
        <ReduxProvider store={store}>
          <WindowEventProvider>
            <JssProvider jss={jss}>
              <Fragment>
                <CssBaseline />
                <App {...this.props} />
              </Fragment>
            </JssProvider>
          </WindowEventProvider>
        </ReduxProvider>
      </Router>
    );
  }
}
