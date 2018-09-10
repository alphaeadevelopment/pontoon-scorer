
import activeHandsListener from './active-hands';

export default (store) => {
  store.subscribe(activeHandsListener({ getState: store.getState, dispatch: store.dispatch }));
};
