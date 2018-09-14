import React from 'react';
import WindowEventProvider from '../WindowEventProvider';

import { createRender } from '../../../../test/src/helpers/render-helpers';

const render = createRender(WindowEventProvider, { wrapped: true });

describe('<WindowEventProvider />', () => {
  it('renders children', () => {
    const { getTree } = render({
      classes: {},
      children: (
        <p>
          Content
        </p>
      ),
    });

    expect(getTree()).toMatchSnapshot();
  });
});
