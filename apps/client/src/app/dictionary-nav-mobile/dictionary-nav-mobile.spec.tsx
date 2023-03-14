import { render } from '@testing-library/react';

import DictionaryNavMobile from './dictionary-nav-mobile';

describe('DictionaryNavMobile', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DictionaryNavMobile />);
    expect(baseElement).toBeTruthy();
  });
});
