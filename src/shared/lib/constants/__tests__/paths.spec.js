import paths from '../paths';

describe('paths', () => {
  it('matches snapshot', () => {
    expect(paths).toMatchSnapshot();
  });
});
