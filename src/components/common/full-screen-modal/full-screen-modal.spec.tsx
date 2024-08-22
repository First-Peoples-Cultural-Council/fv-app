/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react'

import FullScreenModal from './full-screen-modal'

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
