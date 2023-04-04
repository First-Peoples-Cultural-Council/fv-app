import { render } from '@testing-library/react';

import LearnView from './learn';

describe('LearnView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LearnView />);
    expect(baseElement).toBeTruthy();
  });
});
