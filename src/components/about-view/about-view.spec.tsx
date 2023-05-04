import { render } from '@testing-library/react';

import AboutView from './about-view';

describe('AboutView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AboutView />);
    expect(baseElement).toBeTruthy();
  });
});
