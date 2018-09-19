import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import initStore from '../init-store';
import { setSize } from '../../../../../shared/actions/viewport';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('initStore', () => {

  it('dispatches resize via thunk', (done) => {
    const initialState = {}
    const store = mockStore(initialState);
    const { dispatch, actions } = store;
    const expectedAction = {
      type: 'RESIZE',
      payload: {
        height: 400,
        width: 600,
      }
    }
    initStore(store)
      .then(() => {
        expect(store.getActions()).toContainEqual(expectedAction);
        done();
      })
      .catch(done);
  })
})
