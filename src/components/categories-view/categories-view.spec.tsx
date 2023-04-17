import { render } from '@testing-library/react';

import CategoriesView from './categories-view';

describe('CategoriesView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CategoriesView />);
    expect(baseElement).toBeTruthy();
  });
});
