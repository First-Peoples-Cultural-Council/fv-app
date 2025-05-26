/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

// FPCC
import SubNavMobile from 'components/sub-nav-mobile/sub-nav-mobile'

describe('SubNavMobile', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SubNavMobile navItems={[]} />, {
      wrapper: BrowserRouter,
    })
    expect(baseElement).toBeTruthy()
  })
})
