import { render } from '@testing-library/react';

import PhrasesView from './phrases-view';

describe('PhrasesView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PhrasesView />);
    expect(baseElement).toBeTruthy();
  });
});
