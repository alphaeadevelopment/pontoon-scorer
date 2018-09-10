import React from 'react';

import { Provider as ReduxProvider } from 'react-redux';
import { AppContainer } from '../shared/containers';
import '../shared/styles/main.scss';
import { createStore } from '../shared/lib/redux';
import { window, document } from '../shared/services';
import getWindowState from './get-and-clear-window-state';

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
        <AppContainer />
      </ReduxProvider>
    );
  }
}
