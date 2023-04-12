import { render } from '@testing-library/react';

import CategoryView from './category-view';

describe('CategoryView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CategoryView />);
    expect(baseElement).toBeTruthy();
  });
});
