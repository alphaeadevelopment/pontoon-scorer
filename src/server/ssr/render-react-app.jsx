import React from 'react';
import { StaticRouter } from 'react-router';
import { AppContainer } from '../../shared/containers';

export default (url, store, sheets) => (
  <StaticRouter location={url} context={{}}>
    <AppContainer jssRegistry={sheets} store={store} />
  </StaticRouter>
);
