/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react'

import Tooltip from './tooltip'

describe('Tooltip', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Tooltip label={''}>
        <></>
      </Tooltip>
    )
    expect(baseElement).toBeTruthy()
  })
})
