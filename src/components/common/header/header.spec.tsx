/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

// FPCC
import Header from 'components/common/header/header'

describe('Header', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Header />, { wrapper: BrowserRouter })
    expect(baseElement).toBeTruthy()
  })
})
