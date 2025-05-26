/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react'

import Select from 'components/common/select/select'

describe('Select', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Select
        options={[]}
        onChange={function (): void {
          throw new Error('Function not implemented.')
        }}
        selected={''}
        name={''}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
