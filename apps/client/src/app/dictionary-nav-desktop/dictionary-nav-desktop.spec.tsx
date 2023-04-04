import { render } from '@testing-library/react';

import DictionaryNavDesktop from './dictionary-nav-desktop';

describe('DictionaryNavDesktop', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DictionaryNavDesktop />);
    expect(baseElement).toBeTruthy();
  });
});
