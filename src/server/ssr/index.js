import { SheetsRegistry } from 'react-jss';
import { renderToString } from 'react-dom/server';
import { matchPath } from 'react-router-dom';
import routes from '../../shared/routes';
import { createStore } from '../../shared/lib/redux';
import renderFullPage from './render-full-page';
import renderReactApp from './render-react-app';
import initStore from './init-store';
import initComponent from './init-component';

export const doSsr = (activeRoute) => {
  const store = createStore();
  const routerPath = activeRoute.path;

  return Promise.all([
    initStore(store),
    initComponent(activeRoute.component, store),
  ])
    .then(() => {
      const sheets = new SheetsRegistry();

      // Render the component to a string
      const reactAppHtml = renderToString(renderReactApp(routerPath, store, sheets));

      // Send the rendered page back to the client
      return renderFullPage(reactAppHtml, store.getState(), sheets);
    })
    .catch((e) => {
      throw e;
    });
};

export const getActiveRouteForUrl = url => routes.find(
  route => matchPath(url, route),
);