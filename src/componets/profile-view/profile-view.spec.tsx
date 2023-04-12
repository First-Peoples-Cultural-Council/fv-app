import { render } from '@testing-library/react';

import ProfileView from './profile-view';

describe('ProfileView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ProfileView />);
    expect(baseElement).toBeTruthy();
  });
});
