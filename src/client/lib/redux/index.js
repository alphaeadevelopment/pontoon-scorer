import { createStore as createReduxStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../../../client/reducers';
import subscribeListeners from './listeners';
import appMiddleware from './middleware';


export const createStore = (initialState = {}, composeFunction = compose) => {
  const middleware = [thunk, ...appMiddleware];
  if (process.env.NODE_ENV !== 'production') {
    // middleware.push(createLogger());
  }
  const store = createReduxStore(
    rootReducer,
    initialState,
    composeFunction(applyMiddleware(...middleware)),
  );
  subscribeListeners(store);
  return store;
};
