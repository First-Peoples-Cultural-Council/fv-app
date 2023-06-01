import { render } from '@testing-library/react';

import SongsView from './songs-view';

describe('SongsView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SongsView />);
    expect(baseElement).toBeTruthy();
  });
});
