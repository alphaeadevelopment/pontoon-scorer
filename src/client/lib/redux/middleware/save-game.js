import { saveGameToBrowser } from '../../../lib/browser';
import { getGame } from '../../../selectors/game';

export default ({ getState }) => next => (action) => {
  next(action);
  if (process.isBrowser) {
    saveGameToBrowser(getGame(getState()))
      .catch((e) => {
        console.warn('failed to save game state to browser local storage', e); // eslint-disable-line no-console
        next(action);
      });
  }
};
