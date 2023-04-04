import { render } from '@testing-library/react';

import StoriesView from './stories-view';

describe('StoriesView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StoriesView />);
    expect(baseElement).toBeTruthy();
  });
});
