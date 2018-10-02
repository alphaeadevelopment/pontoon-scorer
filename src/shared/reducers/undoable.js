const undoBlacklist = ['RESIZE'];

const doUndo = ({ past, present, future }) => {
  console.log('do undo', past, present, 'future', future);
  const newState = ({
    past: past.slice(1),
    present: past.slice(-1)[0],
    future: [...future, present],
  });
  return newState;
};

const doRedo = state => state;

const createPast = (past, present) => {
  const newPast = past ? [...past] : [];
  return (present) ? [...newPast, present] : newPast;
};
const doAction = (oldState, newPresent) => {
  const { past, present } = oldState;
  console.log('doAction', past, present, newPresent);

  const completeNewState = ({
    present: newPresent,
    past: createPast(past, present),
    future: [],
  });
  return completeNewState;
};

export default wrapped => (state = {}, action) => {
  switch (action.type) {
    case 'UNDO':
      return doUndo(state);

    case 'REDO':
      return doRedo(state);

    default:
      return doAction(state, wrapped(state.present, action));
  }
};
