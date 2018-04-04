/* globals window, document */
import React from 'react';
import CssBaseline from 'material-ui/CssBaseline';
// import SocketProvider from '@alphaeadev/react-socketio';
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider } from 'material-ui/styles';

import { createStore, applyMiddleware, compose } from 'redux';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import theme from './styles/theme';
import reducer from './reducers';
import App from './containers/App';
import './styles/main.scss';

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

const SocketProvider = ({ children }) => children;
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
        <Provider store={store}>
          <SocketProvider serverUrl={process.env.SOCKETIO_URL}>
            <JssProvider>
              <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <App {...this.props} />
              </MuiThemeProvider>
            </JssProvider>
          </SocketProvider>
        </Provider>
      </Router>
    );
  }
}
