/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react'

// FPCC
import FullScreenModal from 'components/common/full-screen-modal/full-screen-modal'

describe('FullScreenModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <FullScreenModal
        onClose={function (): void {
          throw new Error('Function not implemented.')
        }}
      >
        <></>
      </FullScreenModal>
    )
    expect(baseElement).toBeTruthy()
  })
})
