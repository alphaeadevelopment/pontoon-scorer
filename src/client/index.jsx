/* globals document */
import React from 'react';
import { render } from 'react-dom';
import generateId from 'shortid';
import { AppContainer } from 'react-hot-loader';
import Root from './Root';

const doRender = (Component) => {
  console.log('rerender');
  const random = generateId();
  render(<AppContainer><Component __randomId={random} /></AppContainer>, document.getElementById('react-root'));
};

doRender(Root);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./Root', () => {
    doRender(Root);
  });
}
