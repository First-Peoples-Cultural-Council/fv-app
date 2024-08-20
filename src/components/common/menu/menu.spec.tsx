/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';

import Menu from './menu';

describe('Menu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Menu
        menuData={[]}
        closeMenu={function (): void {
          throw new Error('Function not implemented.');
        }}
        referenceElement={null}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
