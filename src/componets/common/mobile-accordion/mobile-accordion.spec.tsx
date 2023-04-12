import { render } from '@testing-library/react';

import MobileAccordion from './mobile-accordion';

describe('MobileAccordion', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MobileAccordion label={''} />);
    expect(baseElement).toBeTruthy();
  });
});
