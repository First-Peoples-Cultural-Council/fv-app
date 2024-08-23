/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react'

import { ConfirmDialog } from './confirm'

describe('ConfirmDialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <ConfirmDialog title={''} message={''} onConfirm={function (): void {}} onCancel={function (): void {}} />
    )
    expect(baseElement).toBeTruthy()
  })
})
