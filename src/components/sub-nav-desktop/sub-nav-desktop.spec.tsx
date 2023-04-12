import { render } from '@testing-library/react';
import React from 'react';

import SubNavDesktop from './sub-nav-desktop';

describe('SubNavDesktop', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SubNavDesktop navItems={[]} />);
    expect(baseElement).toBeTruthy();
  });
});
