import { render } from '@testing-library/react';

import AlphabetView from './alphabet-view';

describe('AlphabetView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AlphabetView />);
    expect(baseElement).toBeTruthy();
  });
});
