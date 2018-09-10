import { setSize } from '../../../../shared/actions/viewport';

export default ({ dispatch }) => new Promise((res) => {
  dispatch(setSize(600, 400));
  res();
});
