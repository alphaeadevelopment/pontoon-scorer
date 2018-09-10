import { setSize } from '../../../../client/actions/viewport';

export default ({ dispatch }) => {
  dispatch(setSize(600, 400));
};
