/* globals document */
import React from 'react';
import { hydrate } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './Root';

const doRender = (Component) => {
  hydrate(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('react-root'));
};

doRender(Root);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./Root', () => {
    doRender(Root);
  });
}
