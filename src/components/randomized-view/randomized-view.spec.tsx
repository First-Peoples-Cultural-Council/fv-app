import { render } from '@testing-library/react';

import RandomizedView from './randomized-view';

describe('WordsView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RandomizedView />);
    expect(baseElement).toBeTruthy();
  });
});
