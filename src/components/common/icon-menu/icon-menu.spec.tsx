/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react'

// FPCC
import IconMenu from 'components/common/icon-menu/icon-menu'

describe('IconMenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<IconMenu menuData={[]} srOnlyLabel={''} icon={undefined} />)
    expect(baseElement).toBeTruthy()
  })
})
