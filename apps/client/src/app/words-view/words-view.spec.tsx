import { render } from '@testing-library/react';

import WordsView from './words-view';

describe('WordsView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WordsView />);
    expect(baseElement).toBeTruthy();
  });
});
