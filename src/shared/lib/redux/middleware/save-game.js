import { saveGameToBrowser, isBrowser } from '../../../lib/browser';
import { getGame } from '../../../pages/Game/game-selectors';

export default ({ getState }) => next => (action) => {
  next(action);
  if (isBrowser()) {
    saveGameToBrowser(getGame(getState()))
      .catch((e) => {
        console.warn('failed to save game state to browser local storage', e); // eslint-disable-line no-console
        next(action);
      });
  }
};
