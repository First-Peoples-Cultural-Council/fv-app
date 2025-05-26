/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react'

// FPCC
import { ConfirmDialog } from 'components/common/confirm/confirm'

describe('ConfirmDialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ConfirmDialog title={''} message={''} onConfirm={function (): void {}} onCancel={function (): void {}} />
    )
    expect(baseElement).toBeTruthy()
  })
})
