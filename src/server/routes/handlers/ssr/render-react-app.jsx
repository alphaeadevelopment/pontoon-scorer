import React from 'react';
import { StaticRouter } from 'react-router';
import { Provider as ReduxProvider } from 'react-redux';
import { AppContainer } from '../../../../shared/containers';

export default (url, store, sheets) => (
  <ReduxProvider store={store}>
    <StaticRouter location={url} context={{}}>
      <AppContainer jssRegistry={sheets} />
    </StaticRouter>
  </ReduxProvider>
);
