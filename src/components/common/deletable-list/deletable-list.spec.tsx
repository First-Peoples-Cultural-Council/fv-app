/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react'

import DeletableList from './deletable-list'

describe('DeletableList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <DeletableList
        header={''}
        confirmMessage={''}
        removeButtonText={''}
        removeSelectedButtonText={''}
        items={[]}
        onDelete={function (): void {
          throw new Error('Function not implemented.')
        }}
        onClick={function (): void {
          throw new Error('Function not implemented.')
        }}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
