/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react'

// FPCC
import Modal from 'components/common/modal/modal'

describe('Modal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Modal
        onClose={function (): void {
          throw new Error('Function not implemented.')
        }}
      >
        <></>
      </Modal>
    )
    expect(baseElement).toBeTruthy()
  })
})
