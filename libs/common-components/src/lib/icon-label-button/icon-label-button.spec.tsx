import { render } from '@testing-library/react';

import IconLabelButton from './icon-label-button';

describe('IconLabelButton', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<IconLabelButton />);
    expect(baseElement).toBeTruthy();
  });
});
