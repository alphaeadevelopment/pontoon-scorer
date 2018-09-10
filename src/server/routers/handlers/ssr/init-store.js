import { setSize } from '../../../../shared/actions/viewport';

export default ({ dispatch }) => new Promise((res) => {
  const d = dispatch(setSize(600, 400));
  console.log(d);
  res();
});
