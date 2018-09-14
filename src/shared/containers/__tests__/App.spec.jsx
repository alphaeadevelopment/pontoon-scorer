import App from '../App';

import { createRender } from '../../../../test/src/helpers/render-helpers';

const render = createRender(App, { wrapped: true });

describe('<App />', () => {
  it('renders', () => {
    const { wrapper, getTree } = render({ classes: {} });

    expect(wrapper.exists()).toBe(true);
    expect(getTree()).toMatchSnapshot();
  });
});
