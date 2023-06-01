import { render } from '@testing-library/react';

import Tooltip from './tooltip';

describe('Tooltip', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Tooltip children={<></>} label={''} />);
    expect(baseElement).toBeTruthy();
  });
});
