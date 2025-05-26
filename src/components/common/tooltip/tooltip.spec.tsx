/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react'

// FPCC
import Tooltip from 'components/common/tooltip/tooltip'

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
