import { render } from '@testing-library/react';

import SubNavMobile from './sub-nav-mobile';

describe('SubNavMobile', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SubNavMobile navItems={[]} />);
    expect(baseElement).toBeTruthy();
  });
});
