import { render } from '@testing-library/react';

import DictionaryView from './dictionary-view';

describe('WordsView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DictionaryView />);
    expect(baseElement).toBeTruthy();
  });
});
