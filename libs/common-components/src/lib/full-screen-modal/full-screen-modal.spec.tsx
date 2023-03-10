import { render } from '@testing-library/react';

import FullScreenModal from './full-screen-modal';

describe('FullScreenModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FullScreenModal />);
    expect(baseElement).toBeTruthy();
  });
});
