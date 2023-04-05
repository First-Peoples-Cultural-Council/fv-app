import { render } from '@testing-library/react';

import FlashcardsView from './flashcards-view';

describe('FlashcardsView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FlashcardsView />);
    expect(baseElement).toBeTruthy();
  });
});
