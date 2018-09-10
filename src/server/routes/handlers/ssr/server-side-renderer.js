import { SheetsRegistry } from 'react-jss';
import { renderToString } from 'react-dom/server';
import { createStore } from '../../../../shared/lib/redux';
import renderFullPage from './render-full-page';
import renderReactApp from './render-react-app';
import initStore from './init-store';

export default (req, res) => {
  const store = createStore();
  initStore(store)
    .then(() => {
      const sheets = new SheetsRegistry();

      // Render the component to a string
      const reactAppHtml = renderToString(renderReactApp(store, sheets));

      // Send the rendered page back to the client
      renderFullPage(reactAppHtml, store.getState(), sheets)
        .then(html => res.status(200).send(html))
        .catch(res.status(500));
    });
};
