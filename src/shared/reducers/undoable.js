import includes from 'lodash.includes';

const undoBlacklist = ['RESIZE', '@@INIT', 'REQUEST_SCROLL_POSITION'];

export const doUndo = ({ past, present, future }) => {
  const newState = ({
    past: past.slice(0, past.length - 1),
    present: past.slice(-1)[0],
    future: [...future, present],
  });
  return newState;
};

export const doRedo = state => state;

export const truncatePast = past => past.slice(-10);

export const createPast = (past, present) => {
  const newPast = past ? [...past] : [];
  return truncatePast((present) ? [...newPast, present] : newPast);
};

export const doAction = (oldState, { type }, newPresent) => {
  const { past, present, future } = oldState;
  let rv;
  if (includes(undoBlacklist, type)) {
    rv = ({
      past,
      present: newPresent,
      future,
    });
  }
  else {
    rv = ({
      present: newPresent,
      past: createPast(past, present),
      future: [],
    });
  }
  return rv;
};

export default wrapped => (state = {}, action) => {
  switch (action.type) {
    case 'UNDO':
      return doUndo(state);

    case 'REDO':
      return doRedo(state);

    default:
      return doAction(state, action, wrapped(state.present, action));
  }
};
