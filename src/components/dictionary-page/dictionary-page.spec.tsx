import { render } from '@testing-library/react';
import React from 'react';

import Dictionary from './dictionary-page';

describe('Dictionary', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Dictionary />);
    expect(baseElement).toBeTruthy();
  });
});
