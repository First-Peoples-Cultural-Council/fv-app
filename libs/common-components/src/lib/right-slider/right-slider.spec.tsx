import { render } from '@testing-library/react';

import RightSlider from './right-slider';

describe('RightSlider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RightSlider />);
    expect(baseElement).toBeTruthy();
  });
});
