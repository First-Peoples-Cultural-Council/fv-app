/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react'

// FPCC
import Alert from 'components/common/alert/alert'

describe('Alert', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Alert
        type={'error'}
        message={undefined}
        showDismissButton={false}
        showAlert={false}
        dismissAlert={function (): void {
          throw new Error('Function not implemented.')
        }}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
