import React from 'react';
import { StaticRouter } from 'react-router';
import { Provider as ReduxProvider } from 'react-redux';
import { AppContainer } from '../../../../shared/containers';

export default (location, store, sheets) => (
  <StaticRouter location={location} context={{}}>
    <ReduxProvider store={store}>
      <AppContainer jssRegistry={sheets} />
    </ReduxProvider>
  </StaticRouter>
);
