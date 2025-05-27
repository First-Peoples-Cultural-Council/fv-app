/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react'

// FPCC
import Menu from 'components/common/menu/menu'

describe('Menu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Menu
        menuData={[]}
        closeMenu={function (): void {
          throw new Error('Function not implemented.')
        }}
        referenceElement={null}
      />
    )
    expect(baseElement).toBeTruthy()
  })
})
