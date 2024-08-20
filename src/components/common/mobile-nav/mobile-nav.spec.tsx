/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import MobileNav from './mobile-nav';

describe('MobileNav', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MobileNav />, { wrapper: BrowserRouter });
    expect(baseElement).toBeTruthy();
  });
});
