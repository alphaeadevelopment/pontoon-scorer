import React, { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { JssProvider, ThemeProvider, SheetsRegistry } from 'react-jss';
import { Provider as ReduxProvider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { create as createJss } from 'jss';
import preset from 'jss-preset-default';
import jssNested from 'jss-nested';
import { App, WindowEventProvider } from '../../../../client/containers';
import renderFullPage from './render-full-page';
import initStore from './init-store';
import { createStore } from '../../../../client/lib/redux';

import theme from '../../../../client/styles/theme';

const jss = createJss(preset(), jssNested());

const renderReact = ({ store, sheets }) => (
  <ReduxProvider store={store}>
    <WindowEventProvider>
      <JssProvider jss={jss} registry={sheets}>
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
export default (req, res) => {
  const store = createStore();
  initStore(store);
  const sheets = new SheetsRegistry();

  // Render the component to a string
  const reactAppHtml = renderToString(renderReact({ store, sheets }));

  // Grab the initial state from our Redux store
  const preloadedState = store.getState();

  // Send the rendered page back to the client
  renderFullPage(reactAppHtml, preloadedState, sheets)
    .then(html => res.status(200).send(html))
    .catch(res.status(500));
};
