/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';

import SubNavMobile from './sub-nav-mobile';
import { BrowserRouter } from 'react-router-dom';

describe('SubNavMobile', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SubNavMobile navItems={[]} />, {
      wrapper: BrowserRouter,
    });
    expect(baseElement).toBeTruthy();
  });
});
