import { window } from '../shared/services';

export default () => {
  // Grab the state from a global variable injected into the server-generated HTML
  const preloadedState = window.__PRELOADED_STATE__; // eslint-disable-line no-underscore-dangle
  // Allow the passed state to be garbage-collected
  delete window.__PRELOADED_STATE__; // eslint-disable-line no-underscore-dangle
  return preloadedState;
};

