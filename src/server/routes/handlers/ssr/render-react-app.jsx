import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { AppContainer } from '../../../../shared/containers';

export default (store, sheets) => (
  <ReduxProvider store={store}>
    <AppContainer jssRegistry={sheets} />
  </ReduxProvider>
);
