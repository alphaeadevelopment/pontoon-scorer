import { createStore as createReduxStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../reducers';
import subscribeListeners from './listeners';
import appMiddleware from './middleware';

export default (initialState = {}, composeFunction = compose) => {
  const middleware = [thunk, ...appMiddleware];
  const store = createReduxStore(
    rootReducer,
    initialState,
    composeFunction(applyMiddleware(...middleware)),
  );
  subscribeListeners(store);
  return store;
};
