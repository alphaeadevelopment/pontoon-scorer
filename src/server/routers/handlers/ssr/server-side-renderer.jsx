import React, { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { JssProvider, ThemeProvider, SheetsRegistry } from 'react-jss';
import { Provider as ReduxProvider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { jss } from '../../../../shared/styles';
import { App, WindowEventProvider } from '../../../../shared/containers';
import { createStore } from '../../../../shared/lib/redux';
import theme from '../../../../shared/styles/theme';
import renderFullPage from './render-full-page';
import initStore from './init-store';

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
  initStore(store)
    .then(() => {
      const sheets = new SheetsRegistry();

      // Render the component to a string
      const reactAppHtml = renderToString(renderReact({ store, sheets }));

      // Grab the initial state from our Redux store
      const preloadedState = store.getState();

      // Send the rendered page back to the client
      renderFullPage(reactAppHtml, preloadedState, sheets)
        .then(html => res.status(200).send(html))
        .catch(res.status(500));
    });
};
