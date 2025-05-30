/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react'

import MultiSwitch from 'components/common/multi-switch/multi-switch'

describe('MultiSwitch', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MultiSwitch
        items={[]}
        onToggle={function (): void {
          throw new Error('Function not implemented.')
        }}
        selected={0}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
